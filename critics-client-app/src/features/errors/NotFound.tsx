import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
  return (
    <Segment textAlign="center" >
      <Header icon>
        <Icon name="search" />
        Sorry, but we could not find what you were looking for!
      </Header>
     <Segment.Inline>
         <Button as={Link} to="/" primary >
             Return to the main page
         </Button>
         </Segment.Inline> 
    </Segment>
  );
}
