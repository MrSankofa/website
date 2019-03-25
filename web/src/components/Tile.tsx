import * as React from "react";
import { Link } from "react-router-dom";

import TileInterface from "../types/Tile";
import * as TileContainer from "../styles/Tile";
import * as TitleTop from "../styles/TitleTop";
import * as TitleBottom from "../styles/TitleBottom";
import * as HoverContentBox from "../styles/HoverContentBox";
import { string } from "prop-types";

interface InitialState {
  hoverContentVisibility: string;
  aboutUsVisibility: string;
}

class Tile extends React.Component<TileInterface, InitialState> {
  readonly state = {
    hoverContentVisibility: "hidden",
    aboutUsVisibility: "visible"
  };
  mouseEnterHoverBox() {
    this.setState({
      hoverContentVisibility: "visible",
      aboutUsVisibility: "hidden"
    });
  }
  mouseLeaveHoverBox() {
    this.setState({
      hoverContentVisibility: "hidden",
      aboutUsVisibility: "visible"
    });
  }
  renderTile() {
    let isHomeTile = this.props.name === "One Sunday At A Time";
    let hasHoverContent = this.props.hover_content ? true : false;
    return (
      <div
        style={{
          ...TileContainer[this.props.query],
          background: `url('${this.props.background_img}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          overflow: "hidden"
        }}
        onMouseEnter={this.mouseEnterHoverBox.bind(this)}
        onMouseLeave={this.mouseLeaveHoverBox.bind(this)}
      >
        {isHomeTile ? (
          <h1
            style={{
              ...TitleTop[this.props.query]
            }}
          >
            one sunday
          </h1>
        ) : null}
        {isHomeTile ? (
          <h1
            style={{
              ...TitleBottom[this.props.query]
            }}
          >
            at a time
          </h1>
        ) : null}
        {isHomeTile ? (
          <p
            style={{
              fontFamily: "Fira Mono, sans-serif",
              textAlign: "center",
              color: "black",
              marginTop: "20%",
              fontSize: "1.25em"
            }}
          >
            brooklyn
          </p>
        ) : null}
        {hasHoverContent ? (
          <div
            style={{
              ...HoverContentBox[this.props.query],
              visibility:
                this.props.query === "desktop"
                  ? this.state.hoverContentVisibility
                  : "visible"
            }}
          >
            <p
              style={{
                fontFamily: "Fira Mono, sans-serif",
                textAlign: "left",
                color: "black"
              }}
            >
              {this.props.hover_content}
            </p>
          </div>
        ) : null}
        {hasHoverContent ? (
          <h2
            style={
              {
                width: "100%",
                fontFamily: "Rifton Norm, sans-serif",
                textAlign: "center",
                color: "white",
                marginTop: "-25vh",
                fontSize: "2em",
                visibility:
                  this.props.query === "desktop"
                    ? this.state.aboutUsVisibility
                    : "hidden"
              } as React.CSSProperties
            }
          >
            About Us
          </h2>
        ) : null}
      </div>
    );
  }
  render() {
    let isLink = this.props.href ? true : false;
    return this.renderTile();
    /*return isLink ? (
      <Link
        style={{
          ...TileContainer[this.props.query],
          textDecoration: "none"
        }}
        to={this.props.href}
        onMouseEnter={this.mouseEnterHoverBox.bind(this)}
        onMouseLeave={this.mouseLeaveHoverBox.bind(this)}
      >
        {this.renderTile()}
      </Link>
    ) : (
      this.renderTile()
    );*/
  }
}

export default Tile;
