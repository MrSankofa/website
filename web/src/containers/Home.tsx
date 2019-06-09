import * as React from "react";
import { useEffect, useState, FunctionComponent, CSSProperties } from "react";
import { transparentize } from "polished";
import MediaQuery from "react-responsive";
import axios from "axios";

import Tile from "../components/Tile";
import Loading from "../components/Loading";
import EmailSignupModal from "../components/EmailSignupModal";
import * as style from "../styles/Home";
import { API_ROOT, DeviceSizes, Colors } from "../constants";

const Home: FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [tiles, setTiles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!tiles.length)
      axios.get(`${API_ROOT}/layout`).then(({ data }) => {
        setLoading(false);
        setTiles(data);
      });
  });

  const renderContainer = (breakpoint: DeviceSizes) => (
    <div style={style[breakpoint] as CSSProperties}>
      <EmailSignupModal
        query={breakpoint}
        overlayColor={transparentize(0.21, Colors.gray3)}
        visible={modalVisible}
        onClickClose={() => setModalVisible(false)}
      />
      {tiles.map(tile => (
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
          openModal={
            tile.fields["Name"] === "Subway Platform"
              ? () => setModalVisible(true)
              : null
          }
        />
      ))}
    </div>
  );

  return loading ? (
    <Loading />
  ) : (
    <div style={{ width: "100vw", minHeight: "100vh" }}>
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
    </div>
  );
};

export default Home;
