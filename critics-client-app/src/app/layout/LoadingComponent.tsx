import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

//this component will be shown in the mai grid.column while requests are loaded
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
