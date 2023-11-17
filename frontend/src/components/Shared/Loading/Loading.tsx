import React from "react";
import "./loading.scss";

const Loading: React.FC = () => {
  return (
    <div className="loadingContainer">
      <div className="loadingBackground">
        <div className="loadingImageGif">
          <img src="/assets/gif/loading.gif" alt="Loading..." />
        </div>
      </div>
    </div>
  );
};

export default Loading;
