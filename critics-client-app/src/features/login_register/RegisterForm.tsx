import React from "react";
import { Segment, Form, Header, Divider } from "semantic-ui-react";

export const RegisterForm = () => {
  return (
    <Segment style={{ width: "95%", margin: "auto" }}>
      <Form>
        <Header as="h3" content="Register:" />
        <Divider />
        <Form.Input placeholder="Email" label="Email" />
        <Form.Input placeholder="Password" label="Password" />
        <Form.Input placeholder="Name" label="Name" />
        <Form.Input placeholder="UserName" label="UserName" />
      </Form>
    </Segment>
  );
};
