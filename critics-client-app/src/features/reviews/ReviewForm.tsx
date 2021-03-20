import React, { ChangeEvent, Fragment, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Redirect } from "react-router";
import {
  DropdownProps,
  Form,
  Grid,
  GridColumn,
  Header,
  Image,
  Segment,
  Select,
} from "semantic-ui-react";
import { Review } from "../../app/models/review";
import { useStore } from "../../app/stores/store";

export const ReviewForm = () => {
  const { filmStore } = useStore();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  const imageUrl =
    "https://image.tmdb.org/t/p/w500" + filmStore.selectedFilm?.poster_path;
  const defaultImageUrl = "/no_picture_available.jpg";

  const countryOptions = [
    { key: 1, value: 1, text: 1 },
    { key: 2, value: 2, text: 2 },
    { key: 3, value: 3, text: 3 },
    { key: 4, value: 4, text: 4 },
    { key: 5, value: 5, text: 5 },
  ];

  //bisongna rendere non statico lo user_id /////////////////////////////////////////////
  const initialState = {
    user_id: 1,
    title: "",
    film_title: filmStore.selectedFilm?.title,
    cover:
      "https://image.tmdb.org/t/p/w500" + filmStore.selectedFilm?.poster_path,
    year: filmStore.selectedFilm?.release_date,
    opinion: "",
    genres: "",
    rating: 0,
    film_id: filmStore.selectedFilm?.id,
  };

  const [review, setReview] = useState(initialState);

  if (filmStore.selectedFilm == null) {
    return <Redirect to="/" />;
  }

  const handleSubmit = () => {
    console.log(review);
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

  return (
    <Fragment>
      <Segment>
        <Grid columns={2} style={{padding:0}}>
          <Grid.Row>
            <Grid.Column width={isDesktop ? 4 : 15} >
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
              <Header as="h3" style={{marginTop:10}}>{filmStore.selectedFilm.title}</Header>

              <Form onSubmit={handleSubmit} inline>
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
                <Select
                  placeholder="Rating"
                  options={countryOptions}
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
