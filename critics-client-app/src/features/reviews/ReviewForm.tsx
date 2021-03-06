import { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Redirect } from "react-router";
import { Button, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ValidationErrors from "../errors/ValidationErrors";
import { observer } from "mobx-react-lite";
import { history } from "../..";
import { ratingOptions } from "../../app/common/options/ratingOptions";
import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import MySelectInput from "../../app/common/form/MySelectInput";
import * as Yup from "yup";
import { Review } from "../../app/models/review";
import { toast } from "react-toastify";

//this component is necessary to store reviews
//it can be accessed only from "Movie.tsx" component
const ReviewForm = () => {
  const { filmStore, reviewStore, userStore } = useStore();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  const imageUrl =
    "https://image.tmdb.org/t/p/w500" + filmStore.selectedFilm?.poster_path;
  const defaultImageUrl = "/images/no_picture_available.jpg";

  const initialState = {
    id: 0,
    user_id: 0,
    title: "",
    film_title: "",
    cover: "",
    year: "",
    opinion: "",
    rating: 0,
    film_id: 0,
    comment_count: 0,
    likes_count: 0,
    error: null,
  };

  const [review, setReview] = useState(initialState);

  const handleFormSubmit = (
    review: Review,
    setErrors: any,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    reviewStore
      .storeReview(review)
      .then(() => history.push("/reviews"))
      .catch((error) => {
        setErrors({ error });
        setSubmitting(false);
      });
  };

  //necessary to handle client validation
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("The title is required")
      .max(200, "Max 200 characters"),
    opinion: Yup.string()
      .required("The opinion is required")
      .max(2000, "Max 2000 characters"),
    rating: Yup.string().required("The rating is required"),
  });

  //the necessary values will be added to the state.review in order to store the new review
  useEffect(() => {
    const newReview = initialState;

    if (filmStore.selectedFilm != null) {
      newReview.film_id = filmStore.selectedFilm.id;
      newReview.film_title = filmStore.selectedFilm.title;
      newReview.cover = imageUrl;
      newReview.year = filmStore.selectedFilm.release_date;
      if (userStore.user) {
        newReview.user_id = userStore.user.id;
      }
      setReview(newReview);
    }
  }, [filmStore.selectedFilm, imageUrl, userStore]);

  //if a user come here without passing from the "Movie.tsx" component, he will be redirected to the main page
  if (!filmStore.selectedFilm) {
    toast.error("You have to select a film first");
    return <Redirect to="/movies" />;
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
              <Header as="h2" style={{ marginTop: 10 }}>
                {filmStore.selectedFilm.title}
              </Header>
              {/********************** FORMIK FORM *********** */}
              <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={review}
                onSubmit={(values, { setErrors, setSubmitting }) =>
                  handleFormSubmit(values, setErrors, setSubmitting)
                }
              >
                {({ handleSubmit, isSubmitting, dirty, isValid, errors }) => (
                  <Form className="ui form error" onSubmit={handleSubmit}>
                    <MyTextInput
                      name="title"
                      label="Title"
                      placeholder="The title of your review"
                    />
                    <MyTextArea
                      name="opinion"
                      label="Opinion"
                      placeholder="Write what you think about the movie"
                      rows={3}
                    />
                    <MySelectInput
                      label="Rating"
                      name="rating"
                      placeholder="0"
                      options={ratingOptions}
                    />
                    <ErrorMessage
                      name="error"
                      render={() => <ValidationErrors errors={errors.error} />}
                    />
                    <Button
                      disabled={isSubmitting || !dirty || !isValid}
                      type="submit"
                      style={{ marginTop: 10 }}
                      primary
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Fragment>
  );
};

export default observer(ReviewForm);
