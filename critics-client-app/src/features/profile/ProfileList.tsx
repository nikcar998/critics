import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Input, Segment } from "semantic-ui-react";
import { ButtonGroupNextBack } from "../../app/layout/ButtonGroupNextBack";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { User } from "../../app/models/user";
import { useStore } from "../../app/stores/store";
import SingleProfileForLists from "./SingleProfileForLists";

//this component show the list of all users
export default observer(function ProfileList() {
  const { userStore } = useStore();

  //this state will use the data coming from "userStore.listUser()" or "userStore.searchUsers()"
  const [users, setUsers] = useState<User[]>([]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    userStore.searchUsers(event.currentTarget.value).then(() => {
      setUsers(userStore.users);
    });
  };

  useEffect(() => {
    userStore.listUser().then(() => {
      setUsers(userStore.users);
    });
  }, [userStore, userStore.page]);
  return userStore.users[0] ? (
    <>
      <Segment.Group>
        <Input
          fluid
          icon="search"
          placeholder="Search..."
          onChange={(event) => {
            handleSearchInput(event);
          }}
          loading={userStore.loading}
          style={{ margin: 5, marginBottom: 15 }}
        />
        {/** LIST OF USERS */}
        {!userStore.loading ? (
          users.map((user) => (
            <SingleProfileForLists user={user} key={user.id} />
          ))
        ) : (
          <div style={{ height: 400 }}>
            <LoadingComponent content="Loading users..." />
          </div>
        )}
      </Segment.Group>
      {/**this component handles pagination for the data returned from a store */}
      <ButtonGroupNextBack store="userStore" />
    </>
  ) : (
    <LoadingComponent />
  );
});
