import React from "react";
import { Button, Container, Icon, Menu } from "semantic-ui-react";

export const Navbar = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <Icon name="film" />
          Critics
        </Menu.Item>
        <Menu.Item name="Films" />
        <Menu.Item name="Reviews" />
        <Menu.Item>
          <Button positive content="Create review" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
