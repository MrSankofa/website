import * as React from "react";
import { FunctionComponent } from "react";

const Loading: FunctionComponent = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      background: "white",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <img
      style={{
        flex: 1,
        maxWidth: "100px",
        maxHeight: "100px"
      }}
      src="/assets/images/animated_spinner.gif"
    />
  </div>
);

export default Loading;
