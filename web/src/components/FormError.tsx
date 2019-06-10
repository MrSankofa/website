import * as React from "react";
import { FunctionComponent } from "react";

import { Typography } from "../styles";
import { DeviceSizes } from "../constants";

type FormErrorProps = {
  query: DeviceSizes;
  message: string;
};

export const FormError: FunctionComponent<FormErrorProps> = ({
  message,
  query
}) => {
  return <p style={{ color: "red", ...Typography[query].p }}>{message}</p>;
};
