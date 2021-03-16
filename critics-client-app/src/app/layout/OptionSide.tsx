import React from "react";
import { Grid, Header, List, Segment } from "semantic-ui-react";

export const OptionSide = () => {
  return (
    <Grid.Column width={3}>
      <Segment.Group raised>
        <Segment className="itemsColor">
          <Header as="h3" icon="options" content="Options" />
        </Segment>
        <Segment className="itemsColor">
          <Header as="h4" icon="film" content="Film" />
          <List bulleted>
            <List.Item>
              <Header as="h5">Latest</Header>
            </List.Item>
            <List.Item>
              <Header as="h5">Popular</Header>
            </List.Item>
            <List.Item>
              <Header as="h5">Top Rated</Header>
            </List.Item>
            <List.Item>
              <Header as="h5">Search</Header>
            </List.Item>
          </List>
        </Segment>
        <Segment className="itemsColor">
          <Header as="h4" icon="th list" content="Reviews" />
          <List bulleted>
            <List.Item><Header as="h5">Timeline</Header></List.Item>
            <List.Item><Header as="h5">Search</Header></List.Item>
          </List>
        </Segment>
        <Segment className="itemsColor">
          <Header as="h4" icon="user outline" content="Profile" />
          <List bulleted>
            <List.Item><Header as="h5">My Profile</Header></List.Item>
            <List.Item><Header as="h5">Edit</Header></List.Item>
            <List.Item><Header as="h5">List</Header></List.Item>
            <List.Item><Header as="h5">Search</Header></List.Item>
            <List.Item><Header as="h5">Logout</Header></List.Item>
            <List.Item><Header as="h5">Delete</Header></List.Item>
          </List>
        </Segment>
      </Segment.Group>
    </Grid.Column>
  );
};
