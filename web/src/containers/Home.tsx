import * as React from "react";
import MediaQuery from "react-responsive";
import axios from "axios";

import Tile from "../components/Tile";
import Loading from "../components/Loading";
import * as style from "../styles/Home";

interface InitialState {
  loading: boolean;
  tiles: object;
}

class Home extends React.Component<{}, InitialState> {
  readonly state = {
    loading: true,
    tiles: []
  };
  componentDidMount() {
    axios
      .get("https://4n2z9csm3a.execute-api.us-east-1.amazonaws.com/prod/layout")
      .then(({ data }) => {
        this.setState({
          loading: false,
          tiles: data
        });
      });
  }
  renderContainer(breakpoint) {
    return (
      <div style={style[breakpoint]}>
        {this.state.tiles.map(tile => (
          <Tile
            query={breakpoint}
            key={tile.id}
            name={tile.fields.Name}
            background_img={
              tile.fields["Image Background"]
                ? tile.fields["Image Background"][0].url
                : ""
            }
            hover_content={
              tile.fields["Hover Content (optional)"]
                ? tile.fields["Hover Content (optional)"]
                : null
            }
            href={tile.fields["Name"] === "Olive Branch" ? "/about" : null}
          />
        ))}
      </div>
    );
  }
  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <div style={{ width: "100vw", minHeight: "100vh" }}>
        <MediaQuery minDeviceWidth={1224}>
          {this.renderContainer("desktop")}
        </MediaQuery>
        <MediaQuery
          minDeviceWidth={480}
          maxDeviceWidth={1224}
          orientation="portrait"
        >
          {this.renderContainer("tablet")}
        </MediaQuery>
        <MediaQuery
          minDeviceWidth={480}
          maxDeviceWidth={1224}
          orientation="landscape"
        >
          {this.renderContainer("desktop")}
        </MediaQuery>
        <MediaQuery maxDeviceWidth={480} orientation="portrait">
          {this.renderContainer("mobile")}
        </MediaQuery>
      </div>
    );
  }
}

export default Home;
