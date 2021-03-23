import React from "react";
import { Grid, Segment, Header, List, Icon } from "semantic-ui-react";

//TODO-> if not used, delete component
//this component was build at the begining of the project. I am waiting to see if it will be useful again
export const FollowingSide = () => {
  return (
    <Grid.Column width={3}>
      <Segment.Group raised>
        <Segment className="itemsColor">
          <Header as="h3" content="Who you are following:" />
        </Segment>
        <Segment className="itemsColor">
          <List divided>
            <List.Item className="itemsColor" style={{ margin: "5px" }}>
              <Header as="h4">
                <Icon name="user circle" />
                Mario Rossi
              </Header>
            </List.Item>
            <List.Item className="itemsColor" style={{ margin: "5px" }}>
              <Header as="h4">
                <Icon name="user circle" />
                Mario Rossi
              </Header>
            </List.Item>
            <List.Item className="itemsColor" style={{ margin: "5px" }}>
              <Header as="h4">
                <Icon name="user circle" />
                Mario Rossi
              </Header>
            </List.Item>
            <List.Item className="itemsColor" style={{ margin: "5px" }}>
              <Header as="h4">
                <Icon name="user circle" />
                Mario Rossi
              </Header>
            </List.Item>
          </List>
        </Segment>
      </Segment.Group>
    </Grid.Column>
  );
};
