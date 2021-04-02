import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Button, Divider, Grid, Header, Icon, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Notification } from "../../app/models/notification";
import NotificationShow from "./NotificationShow";

export default function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [controlVar, setControlVar] = useState(0);
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  useEffect(() => {
    setLoading(true);
    agent.Notifications.list(page).then((resp) => {
      setNotifications(resp.data);
      setPage(resp.current_page);
      setLastPage(resp.last_page);
      setLoading(false);
    });
    agent.Notifications.readNotifications();
  }, [controlVar]);
  return notifications ? (
    <Segment style={isDesktop ? { height: 550 } : { height: 650 }} inverted>
      <Header as="h1" style={{ marginLeft: 25 }} content="Notifications: " />
      <hr style={{padding:0,border:0,borderTop:"1px solid red",marginBottom:15}} />
      {notifications.map((notification) =>
        !loading ? (
          <NotificationShow notification={notification} key={notification.id} />
        ) : (
          <LoadingComponent content="Loading page..." />
        )
      )}
      {lastPage > page && (
        <Button
          icon="arrow right"
          style={{ float: "right" }}
          primary
          onClick={() => {
            setPage(page + 1);
            setControlVar(controlVar + 1);
          }}
        />
      )}
      {page > 1 && (
        <Button
          icon="arrow left"
          style={{ float: "left" }}
          primary
          onClick={() => {
            setPage(page - 1);
            setControlVar(controlVar - 1);
          }}
        />
      )}
    </Segment>
  ) : (
    <LoadingComponent content="Loading Notifications..." />
  );
}
