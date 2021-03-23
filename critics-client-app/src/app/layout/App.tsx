import { Fragment } from "react";
import { Grid } from "semantic-ui-react";
import { Navbar } from "./Navbar";
import OptionSide from "./OptionSide";
import { observer } from "mobx-react-lite";
import { useMediaQuery } from "react-responsive";
import MoviesList from "../../features/movies/MoviesList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReviewsList from "../../features/reviews/ReviewsList";
import ReviewForm from "../../features/reviews/ReviewForm";
import ReviewShow from "../../features/reviews/ReviewShow";
import { ToastContainer } from "react-toastify";

//here i will handle all routing. the layout will change using "react-responsive"
function App() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Router>
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
                  <Route path="/" exact component={MoviesList} />
                  <Route path="/reviews/store" exact component={ReviewForm} />
                  <Route path="/reviews" exact component={ReviewsList} />
                  <Route path="/reviews/:id" component={ReviewShow} />
                </Switch>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Fragment>
      </Router>
    </>
  );
}

export default observer(App);
