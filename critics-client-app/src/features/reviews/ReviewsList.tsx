import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Card, Grid } from "semantic-ui-react";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import Review from "./Review";

const ReviewsList = () => {
  const { reviewStore } = useStore();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  // DA AGGIUNGERE BOTTONE PER PAGINAZIONE ///////////////////
  useEffect(() => {
    reviewStore.loadReviews(1);
  }, []);
  return (
    <Grid.Column width={isDesktop ? 12 : 15} style={{ margin: "10px" }}>
      {reviewStore.loading ? (
        <LoadingComponent />
      ) : (
        <Card.Group centered>
          {reviewStore.reviews.map((review) => (
            <Review review={review} key={review.id} />
          ))}
        </Card.Group>
      )}
    </Grid.Column>
  );
};

export default observer(ReviewsList);
