import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "tailwindcss/tailwind.css";
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  // Googleログイン
  const session = useSession()

  const [happinessMessage, setHappinessMessage] = useState<string | null>(null);

  // 関数: FaceExpressionsの各項目を表示するテーブルを作成
  function createExpressionsTable(expressions: faceapi.FaceExpressions) {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    // 表示する感情の項目
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

  useEffect(() => {
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
        alert("Webcam not available");
      }
    }

    async function loadFaceAPIModels() {
      await faceapi.nets.tinyFaceDetector.load("/models");
      await faceapi.nets.faceLandmark68Net.load("/models");
      await faceapi.nets.faceRecognitionNet.load("/models");
      await faceapi.nets.faceExpressionNet.load("/models");
    }

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

        const emotionThresholds = {
          happy: 0.001, // ハッピー
          sad: 0.004,   // 悲しい
          angry: 0.004  // 怒り
        };

        // テーブルを追加する前に既存のテーブルがあれば削除
        if (tableContainerRef.current) {
          tableContainerRef.current.innerHTML = '';
        }

        resizedDetections.forEach((detection) => {
          const expressions = detection.expressions;
          console.log(expressions);

          let message = null;

          // 各感情に対する閾値を参照してメッセージを設定
          if (expressions.happy && expressions.happy > emotionThresholds.happy) {
            message = "ハッピーな状態です";
          } else if (expressions.sad && expressions.sad > emotionThresholds.sad) {
            message = "悲しい状態です";
          } else if (expressions.angry && expressions.angry > emotionThresholds.angry) {
            message = "怒りな状態です";
          }

          // 顔の中央にメッセージとテーブルを描画
          if (canvas && tableContainerRef.current) {
            const ctx = canvas.getContext("2d");
            if (ctx && detection.detection) {
              const x = detection.detection.box.x + detection.detection.box.width / 2;
              const y = detection.detection.box.y - 10; // 顔の上部に表示するために調整

              if (message) {
                ctx.font = "20px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(message, x, y);
              }

              const table = createExpressionsTable(expressions);
              tableContainerRef.current.appendChild(table);
            }
          }

          //setHappinessMessage(message);
        });
      }, 100);
    }

    detectFace();
  }, []);

  return <>
    <div>
      <video ref={videoRef} autoPlay playsInline muted style={{ display: "block" }} />
      <canvas ref={canvasRef} className={""} />
      <div ref={tableContainerRef} style={{ position: 'absolute', top: '0', left: '0' }}></div>
      {happinessMessage && <p ref={messageRef}>{happinessMessage}</p>}
    </div>

    {session.data ? (
      <>
        Signed in as {session.data?.user?.email} <br />
        <p>name: {session.data?.user?.name}</p>
        <p>image:
          {session.data?.user?.image?(<img src={session.data?.user?.image}/>):(<img src={""}/>)}
          </p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    ) : (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )}
    
  </>
  
}