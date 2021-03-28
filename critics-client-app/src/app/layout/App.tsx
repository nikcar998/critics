import { Fragment } from "react";
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
import { CommentShow } from "../../features/comments/CommentShow";
import { WelcomePage } from "../../features/login_register/WelcomePage";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

//here i will handle all routing. the layout will change using "react-responsive"
function App() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });
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
                  <Grid.Row>
                    {isDesktop && <OptionSide />}
                    <Grid.Column
                      width={isDesktop ? 12 : 15}
                      style={{ margin: "10px" }}
                    >
                      <Switch>
                        <Route path="/movies" exact component={MoviesList} />
                        <Route
                          path="/reviews/store"
                          exact
                          component={ReviewForm}
                        />
                        <Route path="/reviews" exact component={ReviewsList} />
                        <Route path="/reviews/:id" component={ReviewShow} />
                        <Route path="/comment/:id" component={CommentShow} />
                        <Route path="/server-error" component={ServerError} />
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
