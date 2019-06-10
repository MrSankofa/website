import * as React from "react";
import { useState, FunctionComponent, CSSProperties } from "react";
//import { Link } from "react-router-dom";

import {
  Tile as style,
  TitleTop,
  TitleBottom,
  HoverContentBox,
  Typography
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
      onClick={isNewsletterTile ? openModal : null}
      onMouseEnter={mouseEnterHoverBox}
      onMouseLeave={mouseLeaveHoverBox}
    >
      {isHomeTile && (
        <h1
          style={{
            ...Typography[query].h1,
            ...TitleTop[query]
          }}
        >
          one sunday
        </h1>
      )}
      {isHomeTile && (
        <h1
          style={{
            ...Typography[query].h1,
            ...TitleBottom[query]
          }}
        >
          at a time
        </h1>
      )}
      {isHomeTile && (
        <p
          style={{
            ...Typography[query].label,
            textAlign: "center",
            color: Colors.black,
            marginTop: "20%"
          }}
        >
          brooklyn
        </p>
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
          <p
            style={{
              ...Typography[query].label,
              textAlign: "left",
              color: Colors.black
            }}
          >
            {hover_content}
          </p>
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
