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
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Review } from "../../app/models/review";
import { useStore } from "../../app/stores/store";
import { CommentForm } from "../comments/CommentForm";

import { Comments } from "../comments/Comments";

const ReviewShow = () => {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<Review | null>(null);
  


  const defaultImageUrl = "/no_picture_available.jpg";

  const { reviewStore } = useStore();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  const [likeNumberControl, setLikeNumberControl] = useState(0);
  const [likesNumber, setLikesNumber] = useState(0);

  function handleNewLike() {
    if (review) {
      agent.Likes.storeReviewLike(review.id).then(() => {
        if (likeNumberControl == likesNumber) {
          setLikesNumber(likesNumber + 1);
        } else {
          setLikesNumber(likesNumber - 1);
        }
      });
    }
  }


  useEffect(() => {
    reviewStore.loadReview(id).then(() => {
      setReview(reviewStore.selectedReview);
      if (review) {
        setLikeNumberControl(review.likes.length);
        setLikesNumber(review.likes.length);
      }
    });
  }, [id, reviewStore]);


  return (
    <Fragment>
      {reviewStore.loading ? (
        <LoadingComponent />
      ) : (
        review && (
          <Fragment>
            {" "}
            <Segment
              style={
                isDesktop
                  ? {
                      margin: "10px",
                    }
                  : {
                      margin: 0,
                    }
              }
              inverted
            >
              <Grid divided inverted>
                {review.user && (
                  <Grid.Row columns={1} style={{ margin: 0, padding: 0 }}>
                    <Grid.Column>
                      <Segment inverted style={{ margin: 0, padding: 0 }}>
                        <Image
                          src={
                            review.user.avatar
                              ? "http://127.0.0.1:8000/api/show/avatar?url=" +
                                review.user.avatar
                              : defaultImageUrl
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
                <Grid.Row columns={isDesktop ? 2 : 1}>
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
                  <Grid.Column width={isDesktop ? 11 : 16}>
                    <Header style={{ color: "white" }} as="h2">
                      {review.title}
                    </Header>
                    <Divider />
                    <Header
                      style={{ lineHeight: "10%", color: "white" }}
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
                      }}
                    >
                      {review.opinion.length > 190
                        ? review.opinion.slice(0, 190) + "..."
                        : review.opinion}
                    </Header>
                    <Divider />
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
            <CommentForm review={review} setReview={setReview} />
            {review.comment.length > 0 && (
              <Segment color="black" inverted>
                <Header as="h3">Comments:</Header>
                <Divider />
                {review.comment.map((comment) => {
                  if (!comment.parent_id) {
                    return <Comments comment={comment} />;
                  } else {
                    return null;
                  }
                })}
              </Segment>
            )}
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default observer(ReviewShow);
