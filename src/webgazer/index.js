import React, { useContext, useState, useEffect } from "react";
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
  const [attLoading, setLoading] = useState(true);
  const [attention, setAttention] = useState(0.0);
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(0);
  let focus = 0,
    unfocus = 0;
  let focuspoints = [];

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
  const [datapoints, setDatapoints] = useState([]);
  let dps = [];
  let countx = 0;
  const updateChart = () => {
    countx += 1;
    let attention = focuspoints.reduce((a, b) => a + b, 0) / focuspoints.length;
    dps.push({
      x: countx,
      y: attention,
    });
    if (dps.length > 20) {
      focuspoints.shift();
      dps.shift();
    }
    setAttention(attention);
    setDatapoints(dps);
    setCount(countx);
  };

  const handleScriptLoad = () => {
    webgazer = window.webgazer;
    webgazer
      ?.setGazeListener((data, elapsedTime) => {
        if (data == null) {
          return;
        }
      })
      ?.begin();
    webgazer.showVideoPreview(false);

    webgazer.applyKalmanFilter(true);
    let div = document.getElementById("attention-focus-area");
    setInterval(async () => {
      try {
        let [x, y] = await getCoords();
        let { top, left, right, bottom } = div.getBoundingClientRect();
        if (x >= left && x <= right && y <= bottom && y >= top) {
          //focus += 1;
          focuspoints.push(1);
        } else {
          //unfocus += 1;
          focuspoints.push(0);
        }
        updateChart();
      } catch (err) {
        console.log("Error:", err);
        // unfocus += 1;
        focuspoints.push(0);
        updateChart();
      }
    }, 2000);
  };

  const handleScriptError = () => {
    console.log("web gazer failed to load");
  };

  return (
    <WebGazeContext.Provider
      value={{
        attention,
        count,
        attLoading,
        datapoints,
      }}
    >
      <Script
        url="https://webgazer.cs.brown.edu/webgazer.js"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
      {children}
    </WebGazeContext.Provider>
  );
};
