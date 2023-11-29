import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
//import "tailwindcss/tailwind.css";

// カメラ画像をキャプチャし、写真と顔の表情情報を親コンポーネントに渡すコンポーネント
interface PhotoCaptureProps {
  onCapture: (photo: string, expressions: faceapi.FaceDetection[]) => void;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onCapture }) => {
  // カメラ画像をキャプチャして顔の情報を検出する関数
  const capturePhoto = async () => {
    const video = document.getElementById("video") as HTMLVideoElement;

    if (video) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");

      const photo = new Image();
      photo.src = dataUrl;
      photo.onload = async () => {
        const detections = await faceapi
          .detectAllFaces(photo, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors()
          .withFaceExpressions();

        onCapture(dataUrl, detections);
      };
    }
  };

  return <button onClick={capturePhoto}>写真保存</button>;
};

// ホーム画面のコンポーネント
export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [capturedExpressions, setCapturedExpressions] = useState<faceapi.FaceDetection[]>([]);

  // 表情の閾値を設定するオブジェクト
  interface EmotionThresholds {
    happy: number;
    sad: number;
    angry: number;
  }

  useEffect(() => {
    // カメラの設定
    async function setupCamera() {
      const video = videoRef.current;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (video) {
          video.srcObject = stream;
        }
        return new Promise<HTMLVideoElement>((resolve) => {
          if (video) {
            video.onloadedmetadata = () => {
              resolve(video);
            };
          }
        });
      } else {
        alert("カメラが見つかりません");
      }
    }

    // face-api.jsのモデルをロードする
    async function loadFaceAPIModels() {
      await faceapi.nets.tinyFaceDetector.load("/models");
      await faceapi.nets.faceLandmark68Net.load("/models");
      await faceapi.nets.faceRecognitionNet.load("/models");
      await faceapi.nets.faceExpressionNet.load("/models");
    }

    // 顔を検出して表情を表示する
    async function detectFace() {
      await loadFaceAPIModels();
      const video = await setupCamera();
      if (video) {
        video.play();
      }

      const canvas = faceapi.createCanvasFromMedia(video as HTMLVideoElement);
      if (canvas) {
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        document.body.append(canvas);
      }

      const displaySize = { width: video?.videoWidth || 640, height: video?.videoHeight || 480 };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video as HTMLVideoElement, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);

        // 感情の閾値（※要調整）
        const emotionThresholds: EmotionThresholds = {
          happy: 0.001,
          sad: 0.004,
          angry: 0.004,
        };

        // テーブルを追加する前に既存のテーブルがあれば削除（要調整）
        if (tableContainerRef.current) {
          tableContainerRef.current.innerHTML = '';
        }

        resizedDetections.forEach((detection) => {
          const expressions = detection.expressions;
          console.log(expressions);

          let message = null;

          if (expressions.happy && expressions.happy > emotionThresholds.happy) {
            message = "ハッピーな状態です";
          } else if (expressions.sad && expressions.sad > emotionThresholds.sad) {
            message = "悲しい状態です";
          } else if (expressions.angry && expressions.angry > emotionThresholds.angry) {
            message = "怒りな状態です";
          }

          if (canvas && tableContainerRef.current) {
            const ctx = canvas.getContext("2d");
            if (ctx && detection.detection) {
              const x = detection.detection.box.x + detection.detection.box.width / 2;
              const y = detection.detection.box.y - 10;

              if (message) {
                ctx.font = "20px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(message, x, y);
              }

              const table = createExpressionsTable(expressions);
              tableContainerRef.current.appendChild(table);
            }
          }
        });
        //読み取り感覚(1000=1秒)
      }, 1000);
    }

    // 画面がロードされたときに顔の検出を開始する
    detectFace();
  }, []);

  // FaceExpressionsの各項目を表示するテーブルを作成する関数
  function createExpressionsTable(expressions: faceapi.FaceExpressions) {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    const relevantExpressions = ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'];

    for (const key of relevantExpressions) {
      const row = document.createElement("tr");
      const cell1 = document.createElement("td");
      const cell2 = document.createElement("td");

      cell1.textContent = key;
      cell2.textContent = (expressions[key as keyof faceapi.FaceExpressions] as number).toFixed(4);

      row.appendChild(cell1);
      row.appendChild(cell2);

      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    return table;
  }

  return (
    <div>
      {/* カメラ映像を表示するビデオ要素 */}
      <video id="video" ref={videoRef} autoPlay playsInline muted style={{ display: "block" }} />
      {/* 顔を検出した結果を描画するキャンバス要素 */}
      <canvas ref={canvasRef} className={""} />
      {/* 表情情報を表示するコンテナ */}
      <div ref={tableContainerRef} style={{ position: 'absolute', top: '0', left: '0' }}></div>
      {/* キャプチャした写真と表情情報を表示する */}
      {capturedPhoto && (
        <div>
          <img src={capturedPhoto} alt="Captured" />
          <div>
            {capturedExpressions.map((expression, index) => (
              <div key={index}>
                Expression {index + 1}: {JSON.stringify(expression.expressions)}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* 写真をキャプチャするボタンコンポーネント */}
      <PhotoCapture onCapture={(photo, expressions) => {
        setCapturedPhoto(photo);
        setCapturedExpressions(expressions);
      }} />
    </div>
  );
}
/**
 * 
・neutral: ニュートラル
・happy: 喜び
・sad: 悲しみ
・angry: 怒り
・fearful: 恐れ
・disgusted: うんざり
・surprised: 驚き
 */