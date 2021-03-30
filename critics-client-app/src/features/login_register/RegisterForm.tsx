import { ErrorMessage, Form, Formik } from "formik";
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

export const RegisterForm = () => {
  const initialState = {
    id: 0,
    name: "",
    username: "",
    email: "",
    email_verified_at: null,
    description: null,
    avatar: null,
    created_at: null,
    updated_at: null,
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("The name is required"),
    username: Yup.string().required("The username is required"),
    email: Yup.string().required("The email is required").email(),
    password: Yup.string().required("The password is required"),

  });

  const [user, setUser] = useState(initialState);

  return (
    <Segment style={{ width: "95%", margin: "auto" }}>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={user}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Header as="h3" content="Register:" />
            <Divider />
            <MyTextInput label="Name" name="name" placeholder="Name" />
            <MyTextInput label="Username" placeholder="UserName" name="username" />
            <MyTextInput label="Email" placeholder="Email" name="email" />
            <MyTextInput label="Password" placeholder="Password" name="password" type="password" />
            <Button type="submit" content="Register" primary />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};
