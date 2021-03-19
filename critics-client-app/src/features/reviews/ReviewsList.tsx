import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

const ReviewsList = () => {
  const { reviewStore } = useStore();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  useEffect(() => {
    reviewStore.loadReviews(1);
  }, []);
  return (
    <Grid.Column width={isDesktop ? 12 : 15} style={{ margin: "10px" }}>
      {reviewStore.reviews.map((review) => {
        return (
          <div>
            <h1>prova</h1>
            <h1> {review.title} </h1>
            <h2> {review.film_title} </h2>
            {review.comment.map((comm: any) => (
              <div>
                <h1>{comm.body}</h1>
                <h2>prova</h2>
              </div>
            ))}
          </div>
        );
      })}
    </Grid.Column>
  );
};

export default observer(ReviewsList);