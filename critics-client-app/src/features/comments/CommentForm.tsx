import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Form, Grid, Image, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { Comment } from "../../app/models/comment";
import { Review } from "../../app/models/review";
import { useStore } from "../../app/stores/store";

//TODO -> scegliere metodo di salvataggio commenti ed eventualmente cambiare la pagina
//TODO -> togliere richiesta csrf dalla post request
//this component will give the possibility to store a new comment
interface Props {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  comments: Comment[];
  review: Review;
}
export const CommentForm = ({ setComments, comments, review }: Props) => {
  const { reviewStore } = useStore();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });
  const defaultAvatarUrl =
    "/avatar-social-media-isolated-icon-design-vector-10704283.jpg";

  const initialState = {
    id: 0,
    user_id: 0,
    body: "",
    review_id: 0,
    parent_id: null,
    replies: [],
    likes: [],
  };

  const [newComment, setNewComment] = useState(initialState);

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setNewComment({ ...newComment, [name]: value });
  };


  //TODO -> remove sanctum request from here
  //here i will store a new comment and add it to the "comments" array -> ReviewsShow state and Comments prop.
  const handleSubmit = () => {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      agent.Comments.storeComment(newComment).then((resp) => {
        resp.user = review.user;
        setComments([resp, ...comments]);
      });
    });
  };

  //here i will set the necessary values to store the comment
  useEffect(() => {
    const pivotComment = initialState;
    if (reviewStore.selectedReview) {
      pivotComment.review_id = reviewStore.selectedReview.id;
      setNewComment(pivotComment);
    }
  }, []);

  return (
    <Segment style={{ margin: 5 }} secondary>
      <Form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row centered={isDesktop} columns={3} style={{ padding: "5 0" }}>
            <Grid.Column
              width={2}
              textAlign="right"
              verticalAlign="top"
              style={{ padding: 0, margin: 0 }}
            >
              <Image
                src={defaultAvatarUrl}
                circular
                style={{ width: 25, height: 25 }}
                inline
                alt="film poster"
              />
            </Grid.Column>
            <Grid.Column
              width={12}
              style={{ marginBottom: 5, marginLeft: 0, padding: 0 }}
            >
              <Form.TextArea
                placeholder="Write Comment..."
                style={{ borderRadius: 20 }}
                inline
                name="body"
                value={newComment.body}
                onChange={(e) => {
                  handleTextAreaChange(e);
                }}
              />
            </Grid.Column>
            <Grid.Column
              width={1}
              verticalAlign="bottom"
              style={{ marginBottom: 7, marginLeft: 0, padding: 0 }}
            >
              <Form.Button
                compact
                primary
                style={{ margin: 0 }}
                icon="arrow right"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Segment>
  );
};
