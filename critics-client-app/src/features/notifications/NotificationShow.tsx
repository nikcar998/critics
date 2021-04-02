import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Icon, Segment, Grid, Header } from 'semantic-ui-react';
import { Notification } from '../../app/models/notification';

interface Props{
    notification: Notification
}
export default function NotificationShow({notification}:Props) {
    const isDesktop = useMediaQuery({
        query: "(min-width: 1050px)",
      });
        var destinationUrl = "";
        var icon = <Icon />;
        switch (notification.data.type) {
          case "reply":
            icon = (
              <Icon
                name="comments"
                color="teal"
                size="big"
                style={{ marginLeft: 5 }}
              />
            );
            destinationUrl = "/comment/" + notification.data.target_id;
            break;
          case "comment":
            icon = (
              <Icon
                name="comment alternate outline"
                color="teal"
                size="big"
                style={{ marginLeft: 5 }}
              />
            );
            destinationUrl = "/reviews/" + notification.data.target_id;
            break;
          case "follows":
            icon = (
              <Icon
                name="users"
                color="teal"
                size="big"
                style={{ marginLeft: 5 }}
              />
            );
            destinationUrl = "/profile/" + notification.data.target_id;
            break;
          case "like to comment":
            icon = (
              <Icon
                name="like"
                color="teal"
                size="big"
                style={{ marginLeft: 5 }}
              />
            );
            destinationUrl = "/comment/" + notification.data.target_id;
            break;
          case "like to review":
            icon = (
              <Icon
                name="like"
                color="teal"
                size="big"
                style={{ marginLeft: 5 }}
              />
            );
            destinationUrl = "/reviews/" + notification.data.target_id;
            break;
        }
        return (
          <Link to={destinationUrl}>
            <Segment
              style={
                isDesktop
                  ? {
                      padding: "5px 10px",
                      backgroundColor: "#F6EEEC",
                      width: "87%",
                      margin: " 5px auto",
                    }
                  : {
                      padding: "5px 10px",
                      backgroundColor: "#F6EEEC",
                      width: "100%",
                      margin: "10px auto",
                    }
              }
            >
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column
                    width={1}
                    style={{ padding: 0, margin: 0 }}
                    compact
                    textAlign="right"
                  >
                    {icon}
                  </Grid.Column>
                  <Grid.Column
                    width={14}
                    verticalAlign="middle"
                    style={{ marginLeft: 10 }}
                  >
                    <Header
                      as={isDesktop ? "h3" : "h5"}
                      color="blue"
                      content={notification.data.message}
                      style={{ display: "inline-block" }}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Link>
        );
      }
    

