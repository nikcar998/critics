import React from "react";
import { Grid, Segment, Header, List, Icon } from "semantic-ui-react";

export const FollowingSide = () => {
  return (
    <Grid.Column width={3}>
      <Segment.Group raised>
        <Segment className="itemsColor">
          <Header as="h3" content="Who you are following:" />
        </Segment>
        <Segment className="itemsColor">
          <List divided>
            <List.Item className="itemsColor" style={{margin:"5px"}}>
              <Header as="h4">
                <Icon name="user" />
                Mario Rossi
              </Header>
            </List.Item>
            <List.Item className="itemsColor" style={{margin:"5px"}}>
              <Header as="h4">
                <Icon name="user" />
                Mario Rossi
              </Header>
            </List.Item>
            <List.Item className="itemsColor"  style={{margin:"5px"}}>
              <Header as="h4">
                <Icon name="user" />
                Mario Rossi
              </Header>
            </List.Item>
            <List.Item className="itemsColor" style={{margin:"5px"}}>
              <Header as="h4">
                <Icon name="user" />
                Mario Rossi
              </Header>
            </List.Item>
          </List>
        </Segment>
      </Segment.Group>
    </Grid.Column>
  );
};
