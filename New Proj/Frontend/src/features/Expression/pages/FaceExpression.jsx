import React, { useEffect, useRef, useState } from "react";
import "../style/expression.scss"
import { init ,startCamera ,handleDetectClick} from "../utils/utils";

const FaceExpression = () => {
  const videoRef = useRef(null);
  const [faceLandmarker, setFaceLandmarker] = useState(null);
  const [expression, setExpression] = useState("Loading...");

  // Initialize MediaPipe from the imported utils and start the camera
  useEffect(() => {
    init(setFaceLandmarker);
    startCamera(videoRef);
  },[]);

  return (
    <div className="expression-container">
      <h2>Real-Time Face Expression Detection</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "400px",
          borderRadius: "10px",
          border: "2px solid black",
        }}
      />
      <h1 style={{ marginTop: "20px" }}>{expression}</h1>
      <button className="detect-button" onClick={()=>
        handleDetectClick(faceLandmarker,videoRef,setExpression)
        }>
        Detect Expression
      </button>
    </div>
  );
};

export default FaceExpression;