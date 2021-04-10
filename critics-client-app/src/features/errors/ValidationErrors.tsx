import React from "react";
import { Message } from "semantic-ui-react";

//this component is useful to show in forms validation errors  not handled in the client side
interface Props {
  errors: any;
}
export default function ValidationErrors({ errors }: Props) {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err: any, i: any) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
}
