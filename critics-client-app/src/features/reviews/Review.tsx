import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { history } from "../..";
import { Divider, Grid, Header, Icon, Image, Segment } from "semantic-ui-react";
import { Review as ReviewType } from "../../app/models/review";

//this is the structure of a single review, used by the ReviewList component
interface Props {
  review: ReviewType;
}

const Review = ({ review }: Props) => {
  //max charaacters showed in title[0] and in opinion[1]
  //this values will change if  the width is less than 1050 px
  const [maxCharacters, setMaxCharacters] = useState([18, 190]);

  const defaultImageUrl = "/images/no_picture_available.jpg";
  const reviewLink = "/reviews/" + review.id;

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  useEffect(() => {
    if (!isDesktop) {
      setMaxCharacters([10, 150]);
    }
  }, [isDesktop]);
  return (
    <Fragment>
      <Segment
        style={{
          margin: "10px",
          width: "400px",
          maxHeight: 300,
          cursor: "pointer",
        }}
        raised
        inverted
        onClick={() => {
          history.push(reviewLink);
        }}
      >
        <Grid>
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
                      marginLeft: 5,
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
          <Grid.Row columns={2}>
            <Grid.Column width={5} style={{ padding: 0 }}>
              <Image
                src={review.cover ? review.cover : defaultImageUrl}
                style={{
                  height: "100%",
                  width: "150px",
                  marginLeft: 7,
                  marginTop: "-10px",
                }}
                rounded
                centered
              />
            </Grid.Column>
            <Grid.Column width={11}>
              <Header style={{ lineHeight: "10%", color: "white" }} as="h2">
                {review.title.length > maxCharacters[0]
                  ? review.title.slice(0, maxCharacters[0]) + "..."
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
                {review.opinion.length > maxCharacters[1]
                  ? review.opinion.slice(0, maxCharacters[1]) + "..."
                  : review.opinion}
              </Header>
              <Divider />
              <p style={{ display: "inline-block", width: "60%" }}>
                <Icon name="comments" />
                Comments:{review.comment.length}{" "}
              </p>
              <p style={{ display: "inline-block" }}>
                {" "}
                <Icon name="like" /> likes: {review.likes.length}
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Fragment>
  );
};

export default observer(Review);
