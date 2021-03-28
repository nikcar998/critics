import React from 'react'
import { Segment, Form, Header, Divider } from 'semantic-ui-react'

export const LoginForm = () => {
    return (
        <Segment
        style={{
          width: "95%",
          margin: "auto",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <Form style={{ padding: 0, margin: 0 }}>
          <Header as="h3">Login: </Header> <Divider />
          <Form.Input placeholder="Email" label="Email" />
          <Form.Input placeholder="Password" label="Password" />
        </Form>
      </Segment>
    )
}
