import axios from "axios";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Segment, Header, Divider, Button, Label } from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { UserFormValues } from "../../app/models/user";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
  const { userStore } = useStore();

  const validationSchema = Yup.object({
    email: Yup.string().required("The email is required").email(),
    password: Yup.string().required("The password is required"),
  });

  function handleSubmit(values: UserFormValues, setErrors: any) {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      userStore
        .login(values)
        .catch((error) => setErrors({ error: "invalid email or password" }));
    });
  }

  return (
    <Segment
      style={{
        width: "95%",
        margin: "auto",
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={{ email: "", password: "", error: null }}
        onSubmit={(values, { setErrors }) => handleSubmit(values, setErrors)}
      >
        {({ handleSubmit, isSubmitting, errors }) => (
          <Form
            onSubmit={handleSubmit}
            className="ui form"
            style={{ padding: 0, margin: 0 }}
          >
            <Header as="h3">Login: </Header> <Divider />
            <MyTextInput name="email" placeholder="Email" label="Email" />
            <MyTextInput
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
            />
            <ErrorMessage
              name="error"
              render={() => (
                <Label
                  style={{ marginBottom: 10 }}
                  basic
                  color="red"
                  content={errors.error}
                />
              )}
            />
            <Button
              type="submit"
              content="Login"
              primary
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
