import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  Divider,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import { Review as ReviewType } from "../../app/models/review";

interface Props {
  review: ReviewType;
}

const Review = ({ review }: Props) => {
  const defaultImageUrl = "/no_picture_available.jpg";
  const reviewLink = "/reviews/" + review.id;
  const history = useHistory();
  return (
    <Fragment>
      <Segment
        style={{
          margin: "10px",
          width: "400px",
          maxHeight: 300,
          padding: 0,
          cursor: "pointer",
        }}
        raised
        inverted
        onClick={() => {
          history.push(reviewLink);
        }}
      >
        <Image
          src={review.cover ? review.cover : defaultImageUrl}
          style={{ height: "100%", width: "150px" }}
          floated="left"
        />
        <Header style={{ lineHeight: "10%", color: "white" }} as="h2">
          {review.title.length > 18
            ? review.title.slice(0, 18) + "..."
            : review.title}
        </Header>
        <Divider />
        <Header style={{ lineHeight: "10%", color: "white" }} as="h4">
          {review.film_title.length > 18
            ? review.film_title.slice(0, 18) + "..."
            : review.film_title}
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
        <p style={{ display: "inline-block", width: "40%" }}>
          <Icon name="comments" />
          Commenti:{review.comment.length}{" "}
        </p>
        <p style={{ display: "inline-block" }}>
          {" "}
          <Icon name="like" /> likes: {review.likes.length}
        </p>
      </Segment>
    </Fragment>
  );
};

export default observer(Review);
