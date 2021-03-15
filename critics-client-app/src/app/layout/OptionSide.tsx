import React from "react";
import { Grid, Header, List, Segment } from "semantic-ui-react";

export const OptionSide = () => {
  return (
    <Grid.Column width={3}>
      <Segment.Group raised>
        <Segment>
          <Header as="h2" content="Options" />
        </Segment>
        <Segment>
          <Header as="h3" content="Film" />
          <List bulleted>
            <List.Item>Latest</List.Item>
            <List.Item>Popular</List.Item>
            <List.Item>Top Rated</List.Item>
            <List.Item>Search</List.Item>
          </List>
        </Segment>
        <Segment>
          <Header as="h3" content="Reviews" />
          <List bulleted>
            <List.Item>Timeline</List.Item>
            <List.Item>Search</List.Item>
          </List>
        </Segment>
        <Segment>
          <Header as="h3" content="Profile" />
          <List bulleted>
            <List.Item>My Profile</List.Item>
            <List.Item>Edit</List.Item>
            <List.Item>List</List.Item>
            <List.Item>Search</List.Item>
            <List.Item>Logout</List.Item>
            <List.Item>Delete</List.Item>
          </List>
        </Segment>
      </Segment.Group>
    </Grid.Column>
  );
};
