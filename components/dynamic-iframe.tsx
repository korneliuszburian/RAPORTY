import React, { useState, useEffect } from "react";

const DynamicIframe = ({ src }) => {
  const [height, setHeight] = useState("1920px");

  useEffect(() => {
    const updateHeight = () => {
      const newHeight = `${window.innerHeight}px`;
      setHeight(newHeight);
    };

    window.addEventListener("resize", updateHeight);
    updateHeight();

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <iframe
      src={src}
      style={{
        width: "1920px",
        minWidth: "100%",
        minHeight: "100%",
        height: "1080px",
      }}
      sandbox="allow-scripts allow-same-origin"
    ></iframe>
  );
};

export default DynamicIframe;
