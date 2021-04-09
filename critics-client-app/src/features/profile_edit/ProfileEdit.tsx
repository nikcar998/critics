import { Formik, ErrorMessage, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Divider, Header, Segment } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import ValidationErrors from "../errors/ValidationErrors";
import * as Yup from "yup";
import { useStore } from "../../app/stores/store";
import { UserEditFormValues } from "../../app/models/user";
import { observer } from "mobx-react-lite";
import MyTextArea from "../../app/common/form/MyTextArea";
import { history } from "../..";
import { useMediaQuery } from "react-responsive";
import ImageUpload from "./ImageUpload";


export default observer(function ProfileEdit() {
  const { userStore } = useStore();
  const [initialValues, setInitialValues] = useState<UserEditFormValues>({
    name: "",
    username: "",
    description: "",
  });

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(4, "Min 4 characters")
      .max(100, "Max 150 characters"),
    username: Yup.string()
      .min(4, "Min 4 characters")
      .max(100, "Max 100 characters"),
    description: Yup.string()
      .min(4, "Min 8 characters")
      .max(100, "Max 500 characters"),
  });
 
 
  useEffect(() => {
    userStore.user &&
      setInitialValues({
        name: userStore.user.name,
        username: userStore.user.username,
        description: userStore.user.description
          ? userStore.user.description
          : "",
      });
  }, [userStore]);
  return (
    <Segment style={isDesktop ? { width: "85%", margin: "10px auto" } : {}}>
      <Header as="h3" content="Edit your profile: " />
      <Divider />
      <ImageUpload />
      <p style={{fontSize:10}} >You can also drag an image over you avatar to change it.</p>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={{ ...initialValues, error: null }}
        onSubmit={(values, { setErrors, setSubmitting }) =>
          // handleSubmit(values, setErrors, setSubmitting)
          userStore
            .editUser(values)
            .then(() => {
              history.push("/profile/" + userStore.user?.id);
            })
            .catch((error) => {
              setErrors({ error });
            })
        }
      >
        {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
          <Form
            className="ui form error"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            
            <Divider />
            <MyTextInput label="Name" name="name" placeholder="Name" />
            <MyTextInput
              label="Username"
              placeholder="UserName"
              name="username"
            />
            <MyTextArea
              label="Description"
              name="description"
              placeholder=""
              rows={3}
            />
            <ErrorMessage
              name="error"
              render={() => <ValidationErrors errors={errors.error} />}
            />
            <Button
              disabled={!dirty || !isValid || isSubmitting}
              type="submit"
              content="Edit"
              primary
            />
          </Form>
        )}
      </Formik>

   
    </Segment>
  );
});
