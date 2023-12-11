import * as faceapi from "face-api.js"

export type CapturedExpression = {
    detection: faceapi.FaceDetection
    landmarks: faceapi.FaceLandmarks68
    expressions: faceapi.FaceExpressions
}
