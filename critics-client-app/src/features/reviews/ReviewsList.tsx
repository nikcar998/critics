import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { Card } from "semantic-ui-react";
import { ButtonGroupNextBack } from "../../app/layout/ButtonGroupNextBack";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import Review from "./Review";

interface Props{
  id?:number
}
//this component will show the riviews of a user and his friends.
const ReviewsList = (id:Props) => {
  const { reviewStore } = useStore();

  useEffect(() => {
    id ?
    reviewStore.loadReviews()
    : reviewStore.loadUserReviews(id)
  }, [reviewStore, reviewStore.page]);
  return (
    <Fragment>
      {reviewStore.loading ? (
        <LoadingComponent />
      ) : (
        <Fragment>
          <Card.Group centered>
            {reviewStore.reviews.map((review) => (
              <Review review={review} key={review.id} />
            ))}
          </Card.Group>
          <ButtonGroupNextBack store="reviewStore" />
        </Fragment>
      )}
    </Fragment>
  );
};

export default observer(ReviewsList);
