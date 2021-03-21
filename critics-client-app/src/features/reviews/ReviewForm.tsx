import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Redirect, useHistory } from "react-router";
import {
  DropdownProps,
  Form,
  Grid,
  GridColumn,
  Header,
  Image,
  Label,
  Segment,
  Select,
} from "semantic-ui-react";
import { Review } from "../../app/models/review";
import ReviewStore from "../../app/stores/reviewStore";
import { useStore } from "../../app/stores/store";
import { Comment } from "../../app/models/comment";
import axios from "axios";
import ValidationErrors from "../errors/ValidationErrors";
import { observer } from "mobx-react-lite";

const ReviewForm = () => {
  const { filmStore, reviewStore } = useStore();
  const history = useHistory();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  const imageUrl =
    "https://image.tmdb.org/t/p/w500" + filmStore.selectedFilm?.poster_path;
  const defaultImageUrl = "/no_picture_available.jpg";

  const ratingOptions = [
    { key: 0, value: 0, text: 0 },
    { key: 1, value: 1, text: 1 },
    { key: 2, value: 2, text: 2 },
    { key: 3, value: 3, text: 3 },
    { key: 4, value: 4, text: 4 },
    { key: 5, value: 5, text: 5 },
  ];

  //bisongna rendere non statico lo user_id /////////////////////////////////////////////
  const initialState = {
    id: 0,
    user_id: 1,
    title: "",
    film_title: "",
    cover: "",
    year: "",
    opinion: "",
    rating: 0,
    film_id: 0,
    comment: [],
    likes: [],
  };

  const [review, setReview] = useState(initialState);
  const [error, setError] = useState<string[]>([]);
  const handleSubmit = () => {
    console.log(review);

    axios.get("/sanctum/csrf-cookie").then((response) => {
      reviewStore.storeReview(review).then((resp) => {
        if (reviewStore.errors) {
          setError(reviewStore.errors);
        }else{
          history.push("/reviews");
        }
      });
    });
  };
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setReview({ ...review, [name]: value });
  };

  const handleSelectChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    if (typeof data.value == "number") {
      setReview({ ...review, rating: data.value });
    }
  };

  useEffect(() => {
    const newReview = initialState;

    if (filmStore.selectedFilm != null) {
      newReview.film_id = filmStore.selectedFilm.id;
      newReview.film_title = filmStore.selectedFilm.title;
      newReview.cover = imageUrl;
      newReview.year = filmStore.selectedFilm.release_date;
      setReview(newReview);
      // setReview({...review, film_title:})
      // setReview({...review, cover:"https://image.tmdb.org/t/p/w500" + filmStore.selectedFilm?.poster_path})
      // setReview({...review, year:filmStore.selectedFilm?.release_date})
      // setReview({...review, film_id: filmStore.selectedFilm?.id})
    }
  }, []);

  if (filmStore.selectedFilm == null) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <Segment>
        <Grid columns={2} style={{ padding: 0 }}>
          <Grid.Row>
            <Grid.Column width={isDesktop ? 4 : 15}>
              <Image
                src={
                  filmStore.selectedFilm.poster_path
                    ? imageUrl
                    : defaultImageUrl
                }
                centered
                style={{ height: 300, width: 200 }}
              />
            </Grid.Column>
            <Grid.Column width={isDesktop ? 12 : 16}>
              <Header as="h3" style={{ marginTop: 10 }}>
                {filmStore.selectedFilm.title}
              </Header>

              <Form onSubmit={handleSubmit} error>
                {error[0] != null && <ValidationErrors errors={error} />}
                <Form.Input
                  name="title"
                  required
                  label="Title"
                  value={review.title}
                  placeholder="The title of your review"
                  onChange={handleInputChange}
                />
                <Form.TextArea
                  name="opinion"
                  value={review.opinion}
                  label="Opinion"
                  placeholder="Write what you think about the movie"
                  required
                  onChange={handleInputChange}
                  style={{ float: "right" }}
                />
                <Label size="large">Rating:</Label>
                <Select
                  style={{ marginTop: 10 }}
                  placeholder="0"
                  options={ratingOptions}
                  onChange={handleSelectChange}
                />
                <Form.Button style={{ marginTop: 10 }} primary>
                  Submit
                </Form.Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Fragment>
  );
};

export default observer(ReviewForm);
