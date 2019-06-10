import * as React from "react";
import { FunctionComponent } from "react";

import Typography from "../styles/Typography";
import { DeviceSizes } from "../constants";

type FormErrorProps = {
  query: DeviceSizes;
  message: string;
};

const FormError: FunctionComponent<FormErrorProps> = ({ message, query }) => {
  return <p style={{ color: "red", ...Typography[query].p }}>{message}</p>;
};

export default FormError;
