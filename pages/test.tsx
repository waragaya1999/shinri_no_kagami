import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
//import "tailwindcss/tailwind.css";

// カメラ画像をキャプチャし、写真と顔の表情情報を親コンポーネントに渡すコンポーネント
interface PhotoCaptureProps {
  onCapture: (photo: string, expressions: faceapi.WithFaceExpressions<faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection; }, faceapi.FaceLandmarks68>>>[]) => void;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onCapture }) => {
  // カメラ画像をキャプチャして顔の情報を検出する関数
  const capturePhoto = async () => {
  // ビデオ要素を取得
    const video = document.getElementById("video") as HTMLVideoElement;

    if (video) {
      // キャンバスを作成し、ビデオの幅と高さを設定
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      // キャンバスにビデオの画像を描画
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      // キャンバスの画像をデータURLとして取得
      const dataUrl = canvas.toDataURL("image/png");

      // 新しい画像要素を作成し、データURLをソースとして設定
      const photo = new Image();
      photo.src = dataUrl;
      photo.onload = async () => {
        // 画像が読み込まれたら、顔の検出を行う
        const detections = await faceapi
          .detectAllFaces(photo, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors()
          .withFaceExpressions();

        // 顔の検出結果を親コンポーネントに渡す
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

  // 撮影した写真と検出した表情を保持するステート
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [capturedExpressions, setCapturedExpressions] = useState<faceapi.WithFaceExpressions<faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection; }, faceapi.FaceLandmarks68>>>[]>([]);

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

        // 検出結果をリサイズしてキャンバスに合わせる
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        // キャンバスをクリア
        canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
        // キャンバスに検出結果を描画
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

        // 検出結果ごとに処理
        resizedDetections.forEach((detection) => {
          const expressions = detection.expressions;

          // デバッグ用：表情をコンソールに出力
          console.log(expressions);

          let message = null;

          if (expressions.happy && expressions.happy > emotionThresholds.happy) {
            message = "ハッピーな状態です";
          } else if (expressions.sad && expressions.sad > emotionThresholds.sad) {
            message = "悲しい状態です";
          } else if (expressions.angry && expressions.angry > emotionThresholds.angry) {
            message = "怒りな状態です";
          }

          // キャンバスとテーブルコンテナが存在する場合キャンバスのコンテキストを取得
          if (canvas && tableContainerRef.current) {
            const ctx = canvas.getContext("2d");
            // コンテキストと検出結果が存在する場合
            if (ctx && detection.detection) {
              // メッセージを描画する位置を計算
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
        //読み取り間隔(1000=1秒)
      }, 1000);
    }

    // 画面がロードされたときに顔の検出を開始する
    detectFace();
  }, []);

  // FaceExpressionsの各項目を表示するテーブルを作成する関数
  function createExpressionsTable(expressions: faceapi.FaceExpressions) {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    // 表示する感情のリスト
    const relevantExpressions = ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'];

    for (const key of relevantExpressions) {
      const row = document.createElement("tr");
      const cell1 = document.createElement("td");
      const cell2 = document.createElement("td");

      // セルに感情の名前と値を設定
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