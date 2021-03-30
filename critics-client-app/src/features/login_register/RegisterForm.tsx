import { ErrorMessage, Form, Formik, FormikErrors } from "formik";
import React, { Fragment, useState } from "react";
import {
  Segment,
  Header,
  Divider,
  Button,
  FormField,
  Label,
} from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { UserFormValues } from "../../app/models/user";
import { useStore } from "../../app/stores/store";
import ValidationErrors from "../errors/ValidationErrors";

export const RegisterForm = () => {
  const { userStore } = useStore();

  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    error: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("The name is required")
      .min(4, "Min 4 characters")
      .max(100, "Max 100 characters"),
    username: Yup.string()
      .required("The username is required")
      .min(4, "Min 4 characters")
      .max(100, "Max 100 characters"),
    email: Yup.string().required("The email is required").email(),
    password: Yup.string()
      .required("The password is required")
      .min(4, "Min 8 characters")
      .max(100, "Max 100 characters"),
  });

  function handleSubmit(
    values: UserFormValues,
    setErrors: (errors: FormikErrors<{
      name: string;
      username: string;
      email: string;
      password: string;
      error: null;
  }>) => void,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    userStore.register(values).catch((error) => {
      setErrors({ error });
      setSubmitting(false);
    });
  }

  return (
    <Segment style={{ width: "95%", margin: "auto" }}>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setErrors, setSubmitting }) =>
          handleSubmit(values, setErrors, setSubmitting)
        }
      >
        {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
          <Form
            className="ui form error"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Header as="h3" content="Register:" />
            <Divider />
            <MyTextInput label="Name" name="name" placeholder="Name" />
            <MyTextInput
              label="Username"
              placeholder="UserName"
              name="username"
            />
            <MyTextInput label="Email" placeholder="Email" name="email" />
            <MyTextInput
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
            />
            <ErrorMessage
              name="error"
              render={() => <ValidationErrors errors={errors.error} />}
            />
            <Button
              disabled={!dirty || !isValid || isSubmitting}
              type="submit"
              content="Register"
              primary
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};
