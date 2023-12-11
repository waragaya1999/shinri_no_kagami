import * as faceapi from "face-api.js"

type FaceLandmarksWithDetection = faceapi.WithFaceLandmarks<
    {
        detection: faceapi.FaceDetection
    },
    faceapi.FaceLandmarks68
>

type FaceDescriptorWithLandmarks =
    faceapi.WithFaceDescriptor<FaceLandmarksWithDetection>

type FaceExpressionWithDescriptor =
    faceapi.WithFaceExpressions<FaceDescriptorWithLandmarks>

export type PhotoCaptureDto = {
    onCapture: (
        photo: string,
        expressions: FaceExpressionWithDescriptor[],
    ) => void
}
