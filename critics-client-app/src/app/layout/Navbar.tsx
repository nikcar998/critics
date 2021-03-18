import React from "react";
import { Button, Container, Dropdown, Icon, Menu } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import { DropdownOptions } from "./DropdownOptions";

export const Navbar = () => {
  const isDesktop = useMediaQuery({
    query: "(max-width: 1050px)",
  });

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <Icon name="film" />
          Critics
        </Menu.Item>
        <Menu.Item name="Movies" />
        <Menu.Item name="Reviews" />
        {isDesktop && (
         <DropdownOptions />
        )}
      </Container>
    </Menu>
  );
};
