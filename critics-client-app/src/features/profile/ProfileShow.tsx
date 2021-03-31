import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { Button, Divider, Grid, Header, Image } from "semantic-ui-react";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";
import agent from "../../app/api/agent";
import { User } from "../../app/models/user";
import { useStore } from "../../app/stores/store";

export default observer(function ProfileShow() {
  const { id } = useParams<{ id: string }>();
  const { userStore } = useStore();

  const [user, setUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  const defaultImageUrl =
    "/images/avatar-social-media-isolated-icon-design-vector-10704283.jpg";

  const bgColor = { backgroundColor: "#F6EEEC" };

  function toggleFollow() {
    userStore.selectedUser &&
      agent.Follow.toggleFollow(userStore.selectedUser.id).then(() => {
        setIsFollowing(!isFollowing);
      });
  }

  useEffect(() => {
    userStore.selectUser(id).then(() => {
      setUser(userStore.selectedUser);
      userStore.selectedUser &&
        agent.Follow.isFollowing(userStore.selectedUser.id).then((resp) => {
          setIsFollowing(resp);
        });
    });
  }, []);

  return userStore.user && user ? (
    <Fragment>
      <Segment style={bgColor}>
        <Grid>
          <Grid.Row columns={2} style={{ padding: 0, margin: 0 }}>
            {/******************* LEFT SIDE *******************/}
            <Grid.Column
              width={isDesktop ? 3 : 5}
              style={{ padding: 0, margin: 0 }}
            >
              <Segment.Group style={{ height: "100%" }}>
                <Segment style={bgColor} textAlign="center">
                  <Image
                    src={
                      user.avatar
                        ? "http://127.0.0.1:8000/api/show/avatar?url=" +
                          user.avatar
                        : defaultImageUrl
                    }
                    size="small"
                    avatar
                  ></Image>
                </Segment>
                <Segment
                  style={{ ...bgColor, padding: "10px 2px" }}
                  textAlign="center"
                >
                  <Header as="h3" color="red" content={user.name} />
                </Segment>
              </Segment.Group>
            </Grid.Column>
            <Divider vertical />
            {/******************* RIGHT SIDE *******************/}
            <Grid.Column
              width={isDesktop ? 13 : 11}
              style={{ padding: 0, margin: 0 }}
            >
              <Segment.Group style={{ height: "100%" }}>
                <Segment style={bgColor}>
                  <Header as="h2" style={bgColor} content={user.username} />
                </Segment>
                <Segment
                  style={{ ...bgColor, overflow: "auto", height: "9.6rem" }}
                >
                  <Header
                    as="h5"
                    content={"Description: " + user.description}
                  />
                </Segment>
                <Segment
                  attached="bottom"
                  style={{ ...bgColor, padding: "10px 0px" }}
                >
                  <Header
                    as="h6"
                    content={"Followers: " + user.followers?.length}
                    style={{ margin: "0px 5px", display: "inline-block" }}
                  />
                  <Header
                    as="h6"
                    content={"Following: " + user.follows?.length}
                    style={{ margin: "0px 4px", display: "inline-block" }}
                  />
                  {user.id !== userStore.user.id && (
                    <Button
                      color="instagram"
                      content={isFollowing ? "Follow" : "Unfollow"}
                      size="mini"
                      style={!isDesktop ? { float: "right" } : {}}
                      compact
                      onClick={toggleFollow}
                    />
                  )}
                </Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Fragment>
  ) : null;
});
