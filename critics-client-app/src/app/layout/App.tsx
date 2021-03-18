import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Grid, Header, Icon, Image, List, Segment } from "semantic-ui-react";
import { Film } from "../models/film";
import { Navbar } from "./Navbar";
import OptionSide from "./OptionSide";
import { FollowingSide } from "./FollowingSide";
import LatestMovies from "../../features/LatestMovies";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "./LoadingComponent";
import { useMediaQuery } from 'react-responsive'


function App() {
  const isDesktop = useMediaQuery({
    query: '(min-width: 1050px)'
  })
  return (
    <Fragment>
      <Navbar />
      <Grid
        columns={isDesktop ? 2 : 1}
        divided
        style={{ margin: "2px", marginTop: "12px" }}
        className="reactBody"
      >
        <Grid.Row>
          {isDesktop && <OptionSide /> }
          <LatestMovies />
        </Grid.Row>
      </Grid>
    </Fragment>
  );
}

export default observer(App);
