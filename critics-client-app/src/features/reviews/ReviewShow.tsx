import React from "react";
import { useParams } from "react-router";

export const ReviewShow = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h2>{id}</h2>
    </div>
  );
};
