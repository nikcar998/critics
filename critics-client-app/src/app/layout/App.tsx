import { Fragment, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { Navbar } from "./Navbar";
import OptionSide from "./OptionSide";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useMediaQuery } from "react-responsive";
import MoviesList from "../../features/movies/MoviesList";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import  ReviewsList  from "../../features/reviews/ReviewsList";
function App() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });
  return (
    <Router >
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
          <Switch >
          <Route path="/" exact component={MoviesList} />
          <Route path="/reviews" exact component={ReviewsList} />
          </Switch>
        </Grid.Row>
      </Grid>
    </Fragment>
    </Router>
  );
}

export default observer(App);
