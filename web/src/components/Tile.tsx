import * as React from "react";
import { useState, FunctionComponent, CSSProperties } from "react";
import { Link } from "react-router-dom";

import {
  Tile as style,
  Logo,
  HoverContentBox,
  Typography,
  SocialIcon
} from "../styles";
import { DeviceSizes, Colors } from "../constants";

export type TileProps = {
  query: DeviceSizes;
  name: string;
  hover_content: any;
  background_img: string;
  href: string;
  openModal?: () => void;
};

export const Tile: FunctionComponent<TileProps> = ({
  query,
  name,
  hover_content,
  background_img,
  href,
  openModal
}) => {
  const [hoverContentVisibility, setHoverContentVisibility] = useState(
    "hidden"
  );
  const [aboutUsVisibility, setAboutUsVisibility] = useState("visible");
  const isLink = !!href;
  const isHomeTile = name === "One Sunday At A Time";
  const isNewsletterTile = name === "Subway Platform";
  const hasHoverContent = !!hover_content;

  const mouseEnterHoverBox = () => {
    setHoverContentVisibility("visible");
    setAboutUsVisibility("hidden");
  };
  const mouseLeaveHoverBox = () => {
    setHoverContentVisibility("hidden");
    setAboutUsVisibility("visible");
  };

  /*return isLink ? (
      <Link
        style={{
          ...style[query],
          textDecoration: "none"
        }}
        to={href}
        onMouseEnter={mouseEnterHoverBox}
        onMouseLeave={mouseLeaveHoverBox}
      >
        ...
      </Link>
    ) : ...;*/

  const onTileClick = () => {
    if (isNewsletterTile) openModal();
  };

  return (
    <div
      style={
        {
          ...style[query],
          background: `url('${background_img}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          overflow: "hidden",
          cursor: isNewsletterTile ? "pointer" : "inherit"
        } as CSSProperties
      }
      onClick={onTileClick}
      onMouseEnter={mouseEnterHoverBox}
      onMouseLeave={mouseLeaveHoverBox}
    >
      {isHomeTile && (
        <img
          src="/assets/images/sunday-logo.svg"
          alt="One Sunday At A Time"
          style={{
            ...Logo[query]
          }}
        />
      )}
      {isHomeTile && (
        <a
          href="https://g.page/one-sunday-at-a-time?share"
          target="_blank"
          style={{
            flex: 1,
            textDecoration: "none",
            color: Colors.blue,
            display: "inherit",
            marginTop: "20%"
          }}
        >
          <p
            style={{
              ...Typography[query].label,
              textAlign: "center"
            }}
          >
            📍253 Wilson Ave, Bushwick
          </p>
        </a>
      )}
      {isHomeTile && (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <a
            href="https://instagram.com/shoponesunday"
            target="_blank"
            style={{
              flex: 1,
              maxWidth: 15,
              display: "inherit"
            }}
          >
            <img
              src="/assets/images/instagram.png"
              alt="Instagram: @shoponesunday"
              style={{
                ...SocialIcon[query]
              }}
            />
          </a>
        </div>
      )}
      {isNewsletterTile && (
        <h2
          style={
            {
              ...Typography[query].h2,
              width: "100%",
              textAlign: "center",
              color: Colors.offWhite,
              marginTop: "23vh"
            } as CSSProperties
          }
        >
          Newsletter
        </h2>
      )}
      {hasHoverContent && (
        <div
          style={
            {
              ...HoverContentBox[query],
              visibility:
                query === DeviceSizes.Desktop
                  ? hoverContentVisibility
                  : "visible"
            } as CSSProperties
          }
        >
          <Link to="/opening" style={{ textDecoration: "none" }}>
            <p
              style={{
                ...Typography[query].label,
                textAlign: "left",
                color: Colors.black
              }}
            >
              {hover_content}
            </p>
          </Link>
        </div>
      )}
      {hasHoverContent && (
        <h2
          style={
            {
              ...Typography[query].h2,
              width: "100%",
              textAlign: "center",
              color: Colors.offWhite,
              marginTop: "-27vh",
              visibility:
                query === DeviceSizes.Desktop ? aboutUsVisibility : "hidden"
            } as CSSProperties
          }
        >
          About Us
        </h2>
      )}
    </div>
  );
};
