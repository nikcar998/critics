import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export const DropdownOptions = () => {
  const { filmStore } = useStore();

  const changeWhichMoviesToUpload = (filmKind: string) => {
    filmStore.changeWhatToLoad(filmKind);
  };

  return (
    <Menu.Item position="right">
      <Dropdown
        icon="dropdown"
        direction="left"
        button
        className="icon "
        style={{ color: "red", backgroundColor: "#ebe8e8" }}
      >
        <Dropdown.Menu style={{ color: "red" }}>
          <Dropdown.Header
            as="h1"
            style={{ color: "red" }}
            icon="film"
            content="Film"
          />
          <Dropdown.Divider />
          <Dropdown.Item
            text="Now Playing"
            onClick={() => {
              changeWhichMoviesToUpload("nowPlaying");
            }}
          />
          <Dropdown.Item
            text="Popular"
            onClick={() => {
              changeWhichMoviesToUpload("popular");
            }}
          />
          <Dropdown.Item
            text="Top Rated"
            onClick={() => {
              changeWhichMoviesToUpload("top rated");
            }}
          />
          <Dropdown.Divider />
          {/********************************** */}
          <Dropdown.Header
            as="h1"
            style={{ color: "red" }}
            icon="th list"
            content="Reviews"
          />
          <Dropdown.Divider />
          <Dropdown.Item text="Timeline" />
          <Dropdown.Item text="Search" />
          <Dropdown.Divider />
          {/************************** */}
          <Dropdown.Header
            as="h1"
            style={{ color: "red" }}
            icon="user outline"
            content="Profile"
          />
          <Dropdown.Divider />
          <Dropdown.Item text="My Profile"></Dropdown.Item>
          <Dropdown.Item text="Edit" />
          <Dropdown.Item text="List" />
          <Dropdown.Item text="Search" />
          <Dropdown.Item text="Logout" />
          <Dropdown.Item text="Delete" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};
