import { useState } from "react";

type expressionsWhetherDto = {
  email: string;
  faceImage: string;
  expressions: {
    angry: number;
    disgusted: number;
    fearful: number;
    happy: number;
    neutral: number;
    sad: number;
    surprised: number;
  };
  location: string;
  whether: string;
  temp: string;
  humidity: string;
  pressure: string;
};

const resetExpressionsWhether: expressionsWhetherDto = {
  email: "",
  faceImage: "",
  expressions: {
    angry: 0,
    disgusted: 0,
    fearful: 0,
    happy: 0,
    neutral: 0,
    sad: 0,
    surprised: 0,
  },
  location: "",
  whether: "",
  temp: "",
  humidity: "",
  pressure: "",
};
const useSendData = () => {
  const [data, setData] = useState<expressionsWhetherDto>(
    resetExpressionsWhether
  );

  return { data, setData };
};

export default useSendData;