import { useMediaQuery } from "react-responsive";
import {
  Button,
  Grid,
  GridRow,
  Header,
  Image,
  Segment,
} from "semantic-ui-react";
import { Comment } from "../../app/models/comment";

interface Props {
  comment: Comment;
}
export const Comments = ({ comment }: Props) => {
  const defaultImageUrl =
    "/avatar-social-media-isolated-icon-design-vector-10704283.jpg";
  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });
  return (
    <Grid>
      <GridRow columns={2} >
        <Grid.Column
          width={isDesktop ? 1 : 3}
          verticalAlign="top"
          textAlign="right"
          style={{ paddingRight: 0 }}
        >
          <Image
            src={
              comment.user.avatar
                ? "http://127.0.0.1:8000/api/show/avatar?url=" +
                  comment.user.avatar
                : defaultImageUrl
            }
            circular
            style={{ width: "30px", height: "30px", marginBottom: 5 }}
            inline
            verticalAlign="top"
          />
          <Button
            icon="like"
            basic
            color="teal"
            compact
            circular
            size="small"
          />
        </Grid.Column>
        <Grid.Column
          width={isDesktop ? 14 : 13}
          style={{ marginLeft: 0, paddingLeft: 4 }}
        >
          <Segment
            inverted
            style={{
              border: "1px solid red",
              borderRadius: 15,
              marginBottom: 0,
            }}
          >
            <Header as="h3" style={{ marginBottom: "5px" }}>
              {comment.user.name}
            </Header>

            <Header style={{ margin: 0, marginLeft: "15px" }} as="h5">
              {comment.body}
            </Header>
          </Segment>
          <Header
            style={{
              display: "inline-block",
              margin: 1,
              padding: 0,
              color: "white",
            }}
            as="h6"
          >
            Likes:{comment.likes ? comment.likes.length : 0}{" "}
          </Header>{" "}
          <Header
            style={{ display: "inline-block", margin: 0, color: "white" }}
            as="h6"
          >
            {" "}
            Replies:{comment.replies ? comment.replies.length : 0}{" "}
          </Header>
        </Grid.Column>
      </GridRow>
    </Grid>
  );
};
