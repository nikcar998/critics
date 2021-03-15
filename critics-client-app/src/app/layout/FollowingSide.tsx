import React from "react";
import { Grid, Segment, Header, List, Icon } from "semantic-ui-react";

export const FollowingSide = () => {
  return (
    <Grid.Column width={3}>
      <Segment.Group raised>
        <Segment>
          <Header as="h3" content="Who you are following:" />
        </Segment>
        <Segment>
          <List>
            <List.Item>
              <Segment>
                <Header as="h4">
                  <Icon name="user" />
                  Mario Rossi
                </Header>
              </Segment>
            </List.Item>
            <List.Item>
              <Segment>
                <Header as="h4">
                  <Icon name="user" />
                  Mario Rossi
                </Header>
              </Segment>
            </List.Item>
            <List.Item>
              <Segment>
                <Header as="h4">
                  <Icon name="user" />
                  Mario Rossi
                </Header>
              </Segment>
            </List.Item>
            <List.Item>
              <Segment>
                <Header as="h4">
                  <Icon name="user" />
                  Mario Rossi
                </Header>
              </Segment>
            </List.Item>
          </List>
        </Segment>
      </Segment.Group>
    </Grid.Column>
  );
};
