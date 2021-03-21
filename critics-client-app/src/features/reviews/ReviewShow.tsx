import React, { Fragment, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Comment } from "../../app/models/comment";
import { Review } from "../../app/models/review";
import { useStore } from "../../app/stores/store";
import { Comments } from "../comments/Comments";

export const ReviewShow = () => {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<Review | null>(null);

  const defaultImageUrl = "/no_picture_available.jpg";

  const { reviewStore } = useStore();

  useEffect(() => {
    reviewStore.loadReview(id).then(() => {
      setReview(reviewStore.selectedReview);
    });
  }, []);

  return (
    <Fragment>
      {reviewStore.loading ? (
        <LoadingComponent />
      ) : (
        review && (
          <Fragment>
            {" "}
            <Segment
              style={{
                margin: "10px",
              }}
              fluid
              inverted
            >
              <Grid columns={2} divided inverted>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Image
                      src={review.cover ? review.cover : defaultImageUrl}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </Grid.Column>
                  <Grid.Column width={11}>
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
                    >
                      {" "}
                      <Icon name="like" /> likes: {review.likes.length}
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            {review.comment.length > 0 && (
              <Segment color="black" inverted>
                <Header as="h3">Comments:</Header>
                <Divider />
                {review.comment.map((comment) => {
                  if (!comment.parent_id) {
                    return (
                     <Comments comment={comment} />
                    );
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
