import React from "react";
import { Form, Grid, Segment } from "semantic-ui-react";

export const ReviewForm = () => {
  return (
      <Segment>
        <Form>
          <Form.Group widths="equal">
            <Form.Input fluid label="First name" placeholder="First name" />
            <Form.Input fluid label="Last name" placeholder="Last name" />
          </Form.Group>
          <Form.TextArea
            label="About"
            placeholder="Tell us more about you..."
          />
          <Form.Checkbox label="I agree to the Terms and Conditions" />
          <Form.Button>Submit</Form.Button>
        </Form>
      </Segment>
  );
};
