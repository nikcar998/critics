import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { Button, Divider, Grid, Header, Image } from "semantic-ui-react";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";
import agent from "../../app/api/agent";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { User } from "../../app/models/user";
import { useStore } from "../../app/stores/store";
import ReviewsList from "../reviews/ReviewsList";

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
  const bgColor = {
    backgroundImage:
      "linear-gradient(90deg, rgba(0,0,8,1) 0%, rgba(46,46,50,1) 35%, rgba(93,93,99,1) 100%)",
    color: "#F6EEEC",
  };
  const bgColor2 = {
    backgroundImage:
      "linear-gradient(90deg, rgba(93,93,99,1)  0%, rgba(46,46,50,1) 35%, rgba(0,0,8,1) 100%)",
    color: "#F6EEEC",
  };

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
  }, [userStore, id]);

  return userStore.user && user && !userStore.loading ? (
    <Fragment>
      {/****************************** PROFILE SEGMENT  ****************************/}
      <Segment  style={isDesktop && {width:"85%", margin:"20px auto"  }}>
        <Grid >
          <Grid.Row columns={2} style={{ padding: 0, margin: 0 }}>
            {/******************* LEFT SIDE *******************/}
            <Grid.Column
              width={isDesktop ? 3 : 5}
              style={{ padding: 0, margin: 0, height: "100%" }}
            >
              <Segment.Group style={{ ...bgColor, height: "100%" }}>
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
                <Segment style={bgColor2}>
                  <Header as="h2" style={bgColor2} content={user.username} />
                </Segment>
                <Segment
                  style={{ ...bgColor2, overflow: "auto", height: "9.6rem" }}
                >
                  <Header
                    style={bgColor2}
                    as="h5"
                    content={
                      "Description: " +
                      (user.description ? user.description : "")
                    }
                  />
                </Segment>
                <Segment
                  attached="bottom"
                  style={{ ...bgColor2, padding: "10px 0px" }}
                >
                  <Header
                    as="h6"
                    content={"Followers: " + user.followers?.length}
                    style={{
                      color:"#F6EEEC",
                      margin: "0px 5px",
                      display: "inline-block",
                    }}
                  />
                  <Header
                    as="h6"
                    content={"Following: " + user.follows?.length}
                    style={{
                      color:"#F6EEEC",
                      margin: "0px 4px",
                      display: "inline-block",
                    }}
                  />
                  {user.id !== userStore.user.id && (
                    <Button
                      color="instagram"
                      content={!isFollowing ? "Follow" : "Unfollow"}
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
      {/****************************   User's reviews list **************/}
      <ReviewsList id={user.id} />
    </Fragment>
  ) : (
    <LoadingComponent content="Loading user" />
  );
});
