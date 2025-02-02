import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={800}
    height={250}
    viewBox="0 0 500 330"
    backgroundColor="#d6d6d6"
    foregroundColor="#e6e6e6"
    {...props}
  >
    <rect x="136" y="350" rx="0" ry="0" width="0" height="1" />
    <rect x="0" y="0" rx="8" ry="8" width="250" height="150" />
    <rect x="281" y="4" rx="0" ry="0" width="313" height="26" />
    <rect x="280" y="47" rx="0" ry="0" width="630" height="24" />
    <rect x="413" y="5" rx="0" ry="0" width="100" height="24" />
    <rect x="280" y="92" rx="0" ry="0" width="230" height="56" />
  </ContentLoader>
);

export default Loader;
