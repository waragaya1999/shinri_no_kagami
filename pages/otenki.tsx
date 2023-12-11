import { useOtenkiApi } from "@/hooks/useOtenkiApi";
import { useEffect } from "react";

export default function otenki() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getOtenkiApi, muniCd, prefecture, latlon, weather } = useOtenkiApi();

  const handleClick = () => {
    getOtenkiApi()
  }

  return (
    <>
      <button onClick={() => handleClick()}>Test</button>
      <h1>Otenki test</h1>
      <p>lat: {latlon.lat}</p>
      <p>lon: {latlon.lon}</p>
      <p>muniCd: {muniCd}</p>
      <p>prefecture: {prefecture}</p>
      <p>天気: {weather?.weather[0].main}</p>
    </>
  );
}