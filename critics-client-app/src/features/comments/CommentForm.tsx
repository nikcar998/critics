import axios from "axios";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button, Grid, Image, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { Comment, CommentFormValues } from "../../app/models/comment";
import { User } from "../../app/models/user";
import { useStore } from "../../app/stores/store";
import ValidationErrors from "../errors/ValidationErrors";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik, FormikErrors, FormikState } from "formik";
import MyTextArea from "../../app/common/form/MyTextArea";

//TODO -> scegliere metodo di salvataggio commenti ed eventualmente cambiare la pagina
//TODO -> togliere richiesta csrf dalla post request
//this component will give the possibility to store a new comment
interface Props {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  comments: Comment[];
  user: User;
  parent_comment?: Comment;
}
const CommentForm = ({
  setComments,
  comments,
  user,
  parent_comment,
}: Props) => {
  const { reviewStore, userStore } = useStore();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });
  const defaultAvatarUrl =
    "/images/avatar-social-media-isolated-icon-design-vector-10704283.jpg";

  const initialState = {
    user_id: 0,
    body: "",
    review_id: 0,
    parent_id: null,
    error: null,
  };

  const [newComment, setNewComment] = useState<CommentFormValues>(initialState);

  //TODO -> remove sanctum request from here
  //here i will store a new comment and add it to the "comments" array
  const handleFormSubmit = (
    comment: CommentFormValues,
    resetForm: (nextState?: Partial<FormikState<CommentFormValues>> | undefined) => void,
    setErrors: (errors: FormikErrors<CommentFormValues>) => void,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      agent.Comments.storeComment(comment)
        .then((resp) => {
          resp.user = user;
          setComments([resp, ...comments]);
          setNewComment({ ...newComment, body: "" });
          resetForm();
        })
        .catch((error) => {
          setErrors({ error });
          setSubmitting(false);
        });
    });
  };

  const validationSchema = Yup.object({
    body: Yup.string()
      .required("The body is required")
      .max(1000, "Is possible to write a maximum of 1000 characters")
      .min(4, "You have to write a minimum of 4 characters"),
  });

  //here i will set the necessary values to store the comment
  useEffect(() => {
    const pivotComment = initialState;
    if (reviewStore.selectedReview) {
      pivotComment.review_id = reviewStore.selectedReview.id;
      setNewComment(pivotComment);
    }
    if (parent_comment) {
      const secondPivot = newComment;
      secondPivot.review_id = parent_comment.review_id;
      secondPivot.parent_id = parent_comment.id;
      setNewComment(secondPivot);
    }
  }, [parent_comment, reviewStore.selectedReview]);

  return (
    <Segment style={{ margin: 5 }} secondary>
      <Grid>
        <Grid.Row centered={isDesktop} columns={2} style={{ padding: "5 0" }}>
          <Grid.Column
            width={2}
            textAlign="right"
            verticalAlign="top"
            style={{ padding: 0, margin: 0 }}
          >
            <Image
              src={defaultAvatarUrl}
              circular
              style={{ width: 25, height: 25 }}
              inline
              alt="film poster"
            />
          </Grid.Column>
          <Grid.Column
            width={13}
            style={{ marginBottom: 5, marginLeft: 0, padding: 0 }}
          >
            <Formik
              validationSchema={validationSchema}
              enableReinitialize
              initialValues={newComment}
              onSubmit={(values, { resetForm, setErrors, setSubmitting }) =>
                handleFormSubmit(values, resetForm, setErrors, setSubmitting)
              }
            >
              {({ handleSubmit, isSubmitting, dirty, isValid, errors }) => (
                <Form className="ui form error" onSubmit={handleSubmit}>
                  <MyTextArea
                    placeholder="Write Comment..."
                    name="body"
                    rows={3}
                    style={{ padding: 2, borderRadius: 15, width: "100%" }}
                  />
                  <ErrorMessage
                    name="error"
                    render={() => <ValidationErrors errors={errors.error} />}
                  />
                  <Button
                    compact
                    primary
                    disabled={isSubmitting || !dirty || !isValid}
                    floated="right"
                    type="submit"
                    icon="arrow right"
                  />
                </Form>
              )}
            </Formik>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default observer(CommentForm);
