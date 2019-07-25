import * as React from "react";
import { useState, useEffect, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import { transparentize } from "polished";
import { Colors, DeviceSizes } from "../constants";
import { Typography, Button } from "../styles";
import { EmailSignupModal } from "../components";

const Opening: FunctionComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const submit = () => {};
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const renderContainer = query => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        backgroundColor: Colors.offWhite
      }}
    >
      <EmailSignupModal
        query={query}
        overlayColor={transparentize(0.21, Colors.gray3)}
        visible={modalVisible}
        onClickClose={() => setModalVisible(false)}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          height: "100vh",
          width: "100vw",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.offWhite,
          borderBottom: `1px solid ${Colors.blue}`
        }}
      >
        <img
          style={{
            marginTop: "5vh",
            maxHeight: "80vh",
            maxWidth: "90vw"
          }}
          src="/assets/images/onesundayopening.gif"
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Link
            to="/"
            style={
              {
                flex: 1,
                padding: "0 40px",
                maxWidth: 100,
                margin: "5vh 1vw",
                textDecoration: "none",
                ...Button[query],
                color: Colors.offWhite,
                textAlign: "center",
                ...Typography[query].button,
                backgroundColor: Colors.blue,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              } as React.CSSProperties
            }
          >
            About
          </Link>
          <a
            href={
              query === DeviceSizes.Desktop
                ? "https://instagram.com/shoponesunday"
                : "instagram://user?username=shoponesunday"
            }
            style={
              {
                flex: 1,
                padding: "0 40px",
                maxWidth: 100,
                margin: "5vh 1vw",
                textDecoration: "none",
                ...Button[query],
                backgroundColor: Colors.blue,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              } as React.CSSProperties
            }
          >
            <p
              style={{
                color: Colors.offWhite,
                textAlign: "center",
                ...Typography[query].button
              }}
            >
              Follow Us
            </p>
          </a>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          minHeight: "30vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: Colors.offWhite,
          padding: query === DeviceSizes.Desktop ? "10vh 30vw" : "10vh 10vw",
          borderBottom: `1px solid ${Colors.blue}`
        }}
      >
        <h2
          style={{
            color: Colors.blue,
            ...Typography[query].h2
          }}
        >
          Our Grand Opening Event Is Here!
        </h2>
        <p
          style={{
            ...Typography[query].label,
            color: Colors.blue
          }}
        >
          Don't miss our grand opening event on Sunday, July 28th, 12-7pm at{" "}
          <a
            target="_blank"
            style={{ textDecoration: "none", color: Colors.blue3 }}
            href={"https://g.page/one-sunday-at-a-time?share"}
          >
            253 Wilson Ave
          </a>
          . We're bringing you a selection of curated vintage, glassware,
          pottery & home goods, scents & candles, apparel, and accessories &
          jewelry. We'll be serving rosé all day, libations from{" "}
          <a
            target="_blank"
            style={{ textDecoration: "none", color: Colors.blue3 }}
            href={"https://instagram.com/takearecess"}
          >
            @takearecess
          </a>
          , looks and good energy, feat. a special pop-up from{" "}
          <a
            target="_blank"
            style={{ textDecoration: "none", color: Colors.blue3 }}
            href={"https://instagram.com/yassayassayassa"}
          >
            @yassayassayassa
          </a>
          . Come share these Sunday vibes 🍍
        </p>
      </div>
      <div
        style={{
          flex: 1,
          minHeight: "30vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: Colors.offWhite,
          padding: query === DeviceSizes.Desktop ? "10vh 30vw" : "10vh 10vw",
          borderBottom: `1px solid ${Colors.blue}`
        }}
      >
        <h2
          style={{
            color: Colors.blue,
            ...Typography[query].h2
          }}
        >
          {"Psst 👀"}
        </h2>
        <p
          style={{
            ...Typography[query].label,
            color: Colors.blue
          }}
        >
          {
            "To say thanks for signing up for our newsletter, we're giving away exclusive One Sunday totes to our first 20 subscribers who shop with us in-store."
          }
        </p>
        <button
          onClick={() => setModalVisible(true)}
          style={
            {
              flex: 1,
              padding: "0 40px",
              width: 120,
              margin: "5vh 0",
              textDecoration: "none",
              ...Button[query],
              color: Colors.offWhite,
              textAlign: "center",
              ...Typography[query].button,
              backgroundColor: Colors.blue,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            } as React.CSSProperties
          }
        >
          Yeee
        </button>
      </div>
    </div>
  );
  return (
    <>
      <MediaQuery minDeviceWidth={1224}>
        {renderContainer(DeviceSizes.Desktop)}
      </MediaQuery>
      <MediaQuery
        minDeviceWidth={480}
        maxDeviceWidth={1224}
        orientation="portrait"
      >
        {renderContainer(DeviceSizes.Tablet)}
      </MediaQuery>
      <MediaQuery
        minDeviceWidth={480}
        maxDeviceWidth={1224}
        orientation="landscape"
      >
        {renderContainer(DeviceSizes.Desktop)}
      </MediaQuery>
      <MediaQuery maxDeviceWidth={480} orientation="portrait">
        {renderContainer(DeviceSizes.Mobile)}
      </MediaQuery>
    </>
  );
};

export default Opening;
