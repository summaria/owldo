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

  const [modal, setModal] = React.useState(0);
  const [attention, setAttention] = useState(0.0);
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(0);

  const [infocus, setFocus] = useState(true);
  let focus = 0,
    unfocus = 0;
  let focuspoints = [];
  let breakflag = false;
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
  const BREAKPOINT = 10;
  const ATTENTION_THRESHOLD = 0.2;
  let history = [];
  const [datapoints, setDatapoints] = useState([]);
  let dps = [];
  let countx = 0;
  const updateChart = () => {
    countx += 1;
    let attention = focuspoints.reduce((a, b) => a + b, 0) / focuspoints.length;
    history.push(attention);
    if (history.length > BREAKPOINT / 2) {
      history.shift();
    }
    if (history.filter((x) => x > ATTENTION_THRESHOLD).length === 0) {
      if (!breakflag && countx > 120) {
        setModal(4);
        webgazer.pause();
        breakflag = true;
      }
    }

    dps.push({
      x: countx,
      y: attention,
    });
    if (dps.length > 20) {
      dps.shift();
    }
    if (focuspoints.length > 5) {
      focuspoints.shift();
    }
    console.log("Updating focus points:", focuspoints);
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
  };

  useEffect(() => {}, [attention]);
  useEffect(() => {
    if (ready) {
      const x = setInterval(async () => {
        let div = document.getElementById("attention-focus-area");
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
      return () => {
        console.log("Clear timeout");
        clearTimeout(x);
      };
    }
  }, [ready]);

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
        setReady,
        modal,
        setModal,
        webgazer,
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
