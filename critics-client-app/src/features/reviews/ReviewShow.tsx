import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import agent from "../../app/api/agent";
import { ButtonGroupNextBack } from "../../app/layout/ButtonGroupNextBack";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Comment } from "../../app/models/comment";
import { ReviewForShow } from "../../app/models/review";
import { useStore } from "../../app/stores/store";
import CommentForm from "../comments/CommentForm";
import Comments from "../comments/Comments";

//this component shows the review's details and comments
const ReviewShow = () => {
  //route paramater to know whitch review to look for
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<ReviewForShow | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const defaultImageUrl = "/images/no_picture_available.jpg";
  const defaultAvatarUrl =
    "/images/avatar-social-media-isolated-icon-design-vector-10704283.jpg";

  const { reviewStore, commentStore, userStore } = useStore();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  //to change the number of like after "handleNewLike()" i will use two control varibles
  const [likesNumber, setLikesNumber] = useState(0);
  const [likesControlNumber, setLikesControlNumber] = useState(0);

  //this is the necessary logic to understand if the user is adding a like or removing one.
  //TODO-> improve back-end logic to make this function faster
  function handleNewLike() {
    if (review) {
      agent.Likes.storeReviewLike(review.id).then(() => {
        if (reviewStore.selectedReview) {
          const addOrSub = review.likes.filter((like) => {
            if (userStore.user) {
              return like.id === userStore.user.id;
            } else {
              return null;
            }
          });
          //necessary logic to handle likes
          if (addOrSub[0]) {
            likesControlNumber === likesNumber
              ? setLikesNumber(likesNumber - 1)
              : setLikesNumber(likesNumber + 1);
          } else {
            likesControlNumber === likesNumber
              ? setLikesNumber(likesNumber + 1)
              : setLikesNumber(likesNumber - 1);
          }
        }
      });
    }
  }

  useEffect(() => {
    reviewStore.loadReview(id).then(() => {
      setReview(reviewStore.selectedReview);
      if (reviewStore.selectedReview) {
        commentStore
          .loadComments(reviewStore.selectedReview.id)
          .then(() => setComments(commentStore.comments));
        setLikesNumber(reviewStore.selectedReview.likes.length);
        setLikesControlNumber(reviewStore.selectedReview.likes.length);
      }
    });
  }, [id, reviewStore, commentStore]);

  return (
    <Fragment>
      {/******************************* LOADING COMPONENT ************************* */}
      {reviewStore.loading ? (
        <LoadingComponent />
      ) : (
        review && (
          <Fragment>
            {" "}
            <Segment
              style={
               {margin: isDesktop ? "10px" : "0px"}
              }
              inverted
            >
              <Grid divided inverted>
                {/******************************* AVATAR AND USERNAME ************************* */}
                {review.user && (
                  <Grid.Row columns={1} style={{ margin: 0, padding: 0 }}>
                    <Grid.Column>
                      <Segment inverted style={{ margin: 0, padding: 0 }}>
                        <Image
                          src={
                            review.user.avatar
                              ? "http://127.0.0.1:8000/api/show/avatar?url=" +
                                review.user.avatar
                              : defaultAvatarUrl
                          }
                          style={{
                            height: 20,
                            width: 20,
                            marginLeft: 3,
                            marginBottom: 5,
                            marginRight: 4,
                          }}
                          circular
                          inline
                        />
                        <p
                          style={{
                            marginTop: 10,
                            padding: 0,
                            marginBottom: 1,
                            display: "inline-block",
                          }}
                        >
                          {review.user.username
                            ? review.user.username
                            : review.user.name}
                        </p>
                      </Segment>
                      <Divider style={{ margin: 0 }} />
                    </Grid.Column>
                  </Grid.Row>
                )}
                {/******************************* POSTER AND FIELDS ************************* */}
                <Grid.Row columns={isDesktop ? 2 : 1}>
                  {/************* POSTER ****** */}
                  <Grid.Column width={isDesktop ? 4 : 16}>
                    <Image
                      src={review.cover ? review.cover : defaultImageUrl}
                      style={{
                        height: "100%",
                        width: "100%",
                        marginBottom: 10,
                      }}
                    />
                  </Grid.Column>
                  {/******** FIELDS ********** */}
                  <Grid.Column width={isDesktop ? 11 : 16}>
                    <Header
                      style={{ color: "white", overflow: "auto" }}
                      as="h2"
                    >
                      {review.title}
                    </Header>
                    <Divider />
                    <Header
                      style={{
                        lineHeight: "10%",
                        color: "white",
                      }}
                      as="h4"
                    >
                      {review.film_title}
                    </Header>
                    <Divider />

                    <Header
                      as="h6"
                      style={{
                        fontSize: "90%",
                        color: "white",
                        height: "90px",
                        marginTop: 0,
                        overflow: "auto",
                      }}
                    >
                      {review.opinion}
                    </Header>
                    <Divider />
                    <Header as="h5" style={{color:"white", display: "inline-block", margin:"10px 10px 0px 5px"}} content={"Rating: " + review.rating} />
                    <Button
                      color="instagram"
                      style={{ display: "inline-block" }}
                      onClick={handleNewLike}
                    >
                      {" "}
                      <Icon name="like" /> likes: {likesNumber}
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            {/*********************************** COMMENT FORM ************************ */}
            {review.user && userStore.user && (
              <CommentForm
                comments={comments}
                setComments={setComments}
                user={userStore.user}
              />
            )}
            <Segment color="black" inverted>
              <Header as="h3">Comments:</Header>
              <Divider />

              {/*********************************** COMMENTS INDEX ************************ */}

              {commentStore.loading ? (
                <LoadingComponent />
              ) : (
                comments.length > 0 &&
                comments.map((comment) => {
                  if (!comment.parent_id) {
                    return <Comments key={comment.id} comment={comment} />;
                  } else {
                    return null;
                  }
                })
              )}
              {/*** necessary component to handle store pagination */}
              <ButtonGroupNextBack store="commentStore" />
            </Segment>
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default observer(ReviewShow);
