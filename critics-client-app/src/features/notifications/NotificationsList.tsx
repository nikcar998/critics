import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button, Header, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Notification } from "../../app/models/notification";
import NotificationShow from "./NotificationShow";

//this component will list and paginate all the user notifications
export default function NotificationsList() {
  //like the "FollowList.tsx" component these data will be handled only by local state
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null
  );
  //i didn't create a "notificationStore" because these informations
  // will be used only in this component
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  //this state is useful to restart "useEffect" function without using "page" state as dependency
  //useful because it would create an infinite loop
  const [controlVar, setControlVar] = useState(0);
  const [loading, setLoading] = useState(false);

  //get all the necessary data from the agent object
  useEffect(() => {
    setLoading(true);
    agent.Notifications.list(page)
      .then((resp) => {
        setNotifications(resp.data);
        setPage(resp.current_page);
        setLastPage(resp.last_page);
      })
      .finally(() => setLoading(false));
    agent.Notifications.readNotifications();
  }, [controlVar]);
  return notifications ? (
    <Segment style={{ height: "auto" }} inverted>
      <Header as="h1" style={{ marginLeft: 25 }} content="Notifications: " />
      <hr
        style={{
          padding: 0,
          border: 0,
          borderTop: "1px solid red",
          marginBottom: 15,
        }}
      />
      {/***** LIST OF NOTIFICATIONS *** */}
      {notifications.map((notification) =>
        !loading ? (
          <NotificationShow notification={notification} key={notification.id} />
        ) : (
          <LoadingComponent content="Loading page..." key={notification.id} />
        )
      )}
      {/** this structure is similar to the one used to handle follows pagination
         * because both don't use a store but only local states
         */}
      {lastPage > page && (
        <Button
          icon="arrow right"
          style={{ float: "right", marginTop: 20 }}
          primary
          onClick={() => {
            setPage(page + 1);
            window.scrollTo(0, 0);
            setControlVar(controlVar + 1);
          }}
        />
      )}
      {page > 1 && (
        <Button
          icon="arrow left"
          style={{ float: "left", marginTop: 20 }}
          primary
          onClick={() => {
            setPage(page - 1);
            window.scrollTo(0, 0);
            setControlVar(controlVar - 1);
          }}
        />
      )}
    </Segment>
  ) : (
    <LoadingComponent content="Loading Notifications..." />
  );
}
