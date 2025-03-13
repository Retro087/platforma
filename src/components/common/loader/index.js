import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={250}
    viewBox="0 0 100% 250"
    backgroundColor="#d6d6d6"
    foregroundColor="#e6e6e6"
    {...props}
  >
    <rect x="0" y="350" rx="0" ry="0" width="0" height="1" />
    <rect x="15" y="15" rx="8" ry="8" width="250" height="200" />
    <rect x="281" y="15" rx="0" ry="0" width="300" height="26" />
    <rect x="280" y="47" rx="0" ry="0" width="430" height="24" />
    <rect x="280" y="80" rx="0" ry="0" width="330" height="24" />

    <rect x="280" y="150" rx="0" ry="0" width="250" height="56" />
  </ContentLoader>
);

export default Loader;
