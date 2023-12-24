import { useState } from "react"
import { WeatherInfoDto } from "@/types/WeatherInfoDto"

// 位置情報
type LatLon = {
    lat: number
    lon: number
}

interface MuniList {
    MUNI_ARRAY: { [key: string]: string }
}

// 都道府県
const MUNI_LIST: MuniList = {
    MUNI_ARRAY: {
        "01": "Hokkaido",
        "02": "Aomori",
        "03": "Iwate",
        "04": "Miyagi",
        "05": "Akita",
        "06": "Yamagata",
        "07": "Fukushima",
        "08": "Ibaraki",
        "09": "Tochigi",
        "10": "Gunma",
        "11": "Saitama",
        "12": "Chiba",
        "13": "Tokyo",
        "14": "Kanagawa",
        "15": "Niigata",
        "16": "Toyama",
        "17": "Ishikawa",
        "18": "Fukui",
        "19": "Yamanashi",
        "20": "Nagano",
        "21": "Gifu",
        "22": "Shizuoka",
        "23": "Aichi",
        "24": "Mie",
        "25": "Shiga",
        "26": "Kyoto",
        "27": "Osaka",
        "28": "Hyogo",
        "29": "Nara",
        "30": "Wakayama",
        "31": "Tottori",
        "32": "Shimane",
        "33": "Okayama",
        "34": "Hiroshima",
        "35": "Yamaguchi",
        "36": "Tokushima",
        "37": "Kagawa",
        "38": "Ehime",
        "39": "Kochi",
        "40": "Fukuoka",
        "41": "Saga",
        "42": "Nagasaki",
        "43": "Kumamoto",
        "44": "Oita",
        "45": "Miyazaki",
        "46": "Kagoshima",
        "47": "Okinawa",
    },
}

export const useOtenkiApi = () => {
    const [muniCd, setMuniCd] = useState("")
    const [prefecture, setPrefecture] = useState("")
    const [latlon, setLatlon] = useState<LatLon>({ lat: 0, lon: 0 })
    const [weather, setWeather] = useState<WeatherInfoDto>()

    const successCallback = async (position: GeolocationPosition) => {
        setLatlon({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        })

        type LonLatToAddress = {
            results?: {
                muniCd: string
                lv01Nm: string
            }
        }
        try {
            const response = await fetch(
                `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
            )

            if (!response.ok) {
                return undefined
            }
            const lonLatToAddress: LonLatToAddress = await response.json()

            //   郵便番号を取得？
            const muniCd = lonLatToAddress.results?.muniCd
            if (muniCd) {
                setMuniCd(muniCd)

                const prefectureCode = muniCd.substring(0, 2)

                if (MUNI_LIST.MUNI_ARRAY[prefectureCode]) {
                    const pf = MUNI_LIST.MUNI_ARRAY[prefectureCode]
                    setPrefecture(pf)
                    try {
                        const response = await fetch(
                            `https://api.openweathermap.org/data/2.5/weather?q=${pf}&appid=8b088bfd51d569c1bcd2db2dea01a24d&lang=ja`,
                        )
                        const data: WeatherInfoDto = await response.json()
                        setWeather(data)
                    } catch {
                        console.log("error")
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error)
            return undefined
        }
    }

    const errorCallback = (error: GeolocationPositionError) => {
        alert("位置情報が取得できませんでした")
    }

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    }

    const getOtenkiApi = () => {
        getLocation()
    }

    return {
        getOtenkiApi,
        muniCd,
        prefecture,
        latlon,
        weather,
    }
}
