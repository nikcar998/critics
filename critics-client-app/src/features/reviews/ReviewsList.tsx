import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect } from "react";
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
  }, [reviewStore]);
  return (
    <Fragment></Fragment>
      {reviewStore.loading ? (
        <LoadingComponent />
      ) : (
        <Card.Group centered>
          {reviewStore.reviews.map((review) => (
            <Review review={review} key={review.id} />
          ))}
        </Card.Group>
      )}
    </Fragment>
  );
};

export default observer(ReviewsList);
