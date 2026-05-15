import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

// Initialize MediaPipe
export const init = async (setFaceLandmarker) => {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
        );
  
        const landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1,
        });
        
        setFaceLandmarker(landmarker);
};

  // Start Webcam
export const startCamera = async (videoRef) => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
};

// Expression Logic
export const getExpressionFromBlendshapes = (blendshapes) => {
    const getScore = (name) =>
      blendshapes.find((b) => b.categoryName === name)?.score || 0;

    const smile =
      getScore("mouthSmileLeft") + getScore("mouthSmileRight");
    const browDown =
      getScore("browDownLeft") + getScore("browDownRight");
    const eyeBlink =
      getScore("eyeBlinkLeft") + getScore("eyeBlinkRight");

    if (smile > 0.8) return "😊 Happy";
    if (browDown > 0.6) return "😠 Angry";
    if (eyeBlink > 0.7) return "😑 Blink/Neutral";

    return "😐 Neutral";
};


// Map emotion to mood enum
const emotionToMood = (expression) => {
  if (expression.includes("Happy")) return "happy";
  if (expression.includes("Angry")) return "angry";
  return "sad"; // default for neutral/blink
};

// Button Click Handler - Detect Expression Once
export const handleDetectClick = (faceLandmarker,videoRef,setExpression, onMoodDetected) => {
      if (!faceLandmarker || !videoRef.current || videoRef.current.readyState !== 4) {
        setExpression("❌ Camera not ready");
        return;
      }
  
      const now = performance.now();
      const results = faceLandmarker.detectForVideo(videoRef.current, now);
  
      if (results.faceBlendshapes?.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;
        const expr = getExpressionFromBlendshapes(blendshapes);
        setExpression(expr);
        const mood = emotionToMood(expr);
        if (onMoodDetected) {
          onMoodDetected(mood);
        }
      } else {
        setExpression("😐 No face detected");
      }
};
  