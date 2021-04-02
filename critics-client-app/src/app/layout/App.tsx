import { Fragment, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { Navbar } from "./Navbar";
import OptionSide from "./OptionSide";
import { observer } from "mobx-react-lite";
import { useMediaQuery } from "react-responsive";
import MoviesList from "../../features/movies/MoviesList";
import { Switch, Route } from "react-router-dom";
import ReviewsList from "../../features/reviews/ReviewsList";
import ReviewForm from "../../features/reviews/ReviewForm";
import ReviewShow from "../../features/reviews/ReviewShow";
import { ToastContainer } from "react-toastify";
import CommentShow from "../../features/comments/CommentShow";
import WelcomePage from "../../features/login_register/WelcomePage";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import { useStore } from "../stores/store";
import { LoadingComponent } from "./LoadingComponent";
import axios from "axios";
import ProfileShow from "../../features/profile/ProfileShow";
import ProfileList from "../../features/profile/ProfileList";
import NotificationsList from "../../features/notifications/NotificationsList";
import FollowList from "../../features/follow/FollowList";

//here i will handle all routing. the layout will change using "react-responsive"
function App() {
  const { commonStore, userStore } = useStore();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });
  useEffect(() => {
    axios.get("/sanctum/csrf-cookie");
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app..." />;
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Route path="/" exact component={WelcomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <Navbar />
            <Grid
              columns={isDesktop ? 2 : 1}
              divided
              style={{ margin: "2px", marginTop: "12px" }}
              className="reactBody"
            >
              <Grid.Row style={{ minHeight: 600 }}>
                {isDesktop && <OptionSide />}
                <Grid.Column
                  width={isDesktop ? 12 : 15}
                  style={{ margin: "10px" }}
                >
                  <Switch>
                    <Route path="/movies" exact component={MoviesList} />
                    <Route path="/reviews/store" exact component={ReviewForm} />
                    <Route path="/reviews" exact component={ReviewsList} />
                    <Route
                      path="/reviews/all"
                      exact
                      component={() => <ReviewsList all={true} />}
                    />
                    <Route path="/reviews/:id" exact component={ReviewShow} />
                    <Route path="/comment/:id" exact component={CommentShow} />
                    <Route path="/profile/:id" exact component={ProfileShow} />
                    <Route
                      path="/profile/list/users"
                      exact
                      component={ProfileList}
                    />
                    <Route
                      path="/following"
                      exact
                      component={() => (
                        <FollowList followingOrFollowers={true} />
                      )}
                    />
                    <Route
                      path="/followers"
                      exact
                      component={() => (
                        <FollowList followingOrFollowers={false} />
                      )}
                    />
                    <Route
                      path="/notifications"
                      exact
                      component={NotificationsList}
                    />
                    <Route path="/server-error" exact component={ServerError} />
                    <Route component={NotFound} />
                  </Switch>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Fragment>
        )}
      />
    </>
  );
}

export default observer(App);
