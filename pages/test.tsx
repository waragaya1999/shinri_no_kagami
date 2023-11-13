import React, {useEffect, useRef} from "react"
import * as faceapi from "face-api.js"
import "tailwindcss/tailwind.css"

export default function Home() {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        async function setupCamera() {
            const video = videoRef.current
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({video: true})
                if (video) {
                    video.srcObject = stream
                }
                return new Promise<HTMLVideoElement>((resolve) => {
                    if (video) {
                        video.onloadedmetadata = () => {
                            resolve(video)
                        }
                    }
                })
            } else {
                alert("Webcam not available")
            }
        }

        async function loadFaceAPIModels() {
            await faceapi.nets.tinyFaceDetector.load("/models")
            await faceapi.nets.faceLandmark68Net.load("/models")
            await faceapi.nets.faceRecognitionNet.load("/models")
        }

        async function detectFace() {
            await loadFaceAPIModels() // モデルをロード
            const video = await setupCamera()
            if (video) {
                video.play()
            }

            const canvas = faceapi.createCanvasFromMedia(video as HTMLVideoElement)
            if (canvas) {
                document.body.append(canvas)
            }

            const displaySize = {width: video?.videoWidth || 640, height: video?.videoHeight || 480}
            faceapi.matchDimensions(canvas, displaySize)

            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(video as HTMLVideoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors()
                const resizedDetections = faceapi.resizeResults(detections, displaySize)
                canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height)
                faceapi.draw.drawDetections(canvas, resizedDetections)
            }, 100)
        }

        detectFace()
    }, [])

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline muted style={{display: "block"}}/>
            <canvas ref={canvasRef} className={""}/>
        </div>
    )
}
