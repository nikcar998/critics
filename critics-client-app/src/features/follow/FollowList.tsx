import { useEffect, useState } from "react";
import { Segment, Button } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { User } from "../../app/models/user";
import SingleProfileForLists from "../profile/SingleProfileForLists";

//this component will show the list of all the user follows and followers
interface Props {
  followingOrFollowers: boolean;
}

export default function FollowList({ followingOrFollowers }: Props) {
  // i didn't create a "followstore" to avoid any confution with the userStore
  // so every necessary variable is handled by these states
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  //this state is useful to restart "useEffect" function without using "page" state as dependency
  //useful because it would create an infinite loop
  const [controlVar, setControlVar] = useState(0);

  //here i will check if the user is looking for his follows or followers
  //and show the relative data
  useEffect(() => {
    if (followingOrFollowers) {
      agent.Follow.listFollowing(page)
        .then((resp) => {
          setUsers(resp.data);
          setPage(resp.current_page);
          setLastPage(resp.last_page);
        })
        .finally(() => setLoading(false));
    } else {
      agent.Follow.listFollowers(page)
        .then((resp) => {
          setUsers(resp.data);
          setPage(resp.current_page);
          setLastPage(resp.last_page);
        })
        .finally(() => setLoading(false));
    }
    setLoading(true);
  }, [controlVar, followingOrFollowers, page]);

  return (
    <>
      <Segment.Group>
        {/**after loading the list of users will be shown */}
        {!loading ? (
          users.map((user) => (
            <SingleProfileForLists user={user} key={user.id} />
          ))
        ) : (
          <div style={{ height: 400 }}>
            <LoadingComponent content="Loading users..." />
          </div>
        )}
        {/** this structure is similar to the one used to handle notifications pagination
         * because both don't use a store but only local states
         */}
        {lastPage > page && (
          <Button
            icon="arrow right"
            style={{ float: "right", marginTop: 20 }}
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
            style={{ float: "left", marginTop: 20 }}
            primary
            onClick={() => {
              setPage(page - 1);
              setControlVar(controlVar - 1);
            }}
          />
        )}
      </Segment.Group>
    </>
  );
}
