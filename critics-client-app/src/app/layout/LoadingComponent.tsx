import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

//this component will be shown if the store is stil loading data
interface Props {
  inverted?: boolean;
  content?: string;
}
export const LoadingComponent = ({
  inverted = true,
  content = "Loading..",
}: Props) => {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
};
