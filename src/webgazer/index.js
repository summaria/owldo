import React, { useContext, useState } from "react";
import Script from "react-load-script";
var webgazer;

const WebGazeContext = React.createContext();

export const useWebGazer = () => {
  return useContext(WebGazeContext);
};

export const WebGazeProvider = ({ children }) => {
  const [coords, setCoords] = useState({
    x: -1,
    y: -1,
  });

  const getCoords = async () => {
    var prediction = await webgazer.getCurrentPrediction();
    if (prediction) {
      var x = prediction.x;
      var y = prediction.y;
      return [x, y];
    } else {
      console.log("Error");
    }
  };
  const handleScriptLoad = () => {
    webgazer = window.webgazer;
    webgazer
      ?.setGazeListener((data, elapsedTime) => {
        if (data == null) {
          return;
        }
        console.log(data);
      })
      ?.begin();
    webgazer.showVideoPreview(false);
    setInterval(async () => {
      try {
        let coords = await getCoords();
        console.log(coords);
      } catch (err) {
        console.log(err);
      }
    }, 2000);
  };

  const handleScriptError = () => {
    console.log("error");
  };

  return (
    <WebGazeContext.Provider value={coords}>
      <Script
        url="https://webgazer.cs.brown.edu/webgazer.js"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
      {children}
    </WebGazeContext.Provider>
  );
};
