import { WeatherInfoDto } from "@/types/WeatherInfoDto"
import { useState } from "react"

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
    const [prefecture, setPrefecture] = useState("Tokyo")
    const [latlon, setLatlon] = useState<LatLon>({ lat: 0, lon: 0 })
    const [weather, setWeather] = useState<WeatherInfoDto>({
        coord: { lon: 139.6917, lat: 35.6895 },
        weather: [
            { id: 803, main: "Clouds", description: "曇りがち", icon: "04d" },
        ],
        base: "stations",
        main: {
            temp: 282.56,
            feels_like: 278.87,
            temp_min: 281.84,
            temp_max: 284.12,
            pressure: 1009,
            humidity: 48,
        },
        visibility: 10000,
        wind: { speed: 8.75, deg: 10 },
        clouds: { all: 75 },
        dt: 1704589682,
        sys: {
            type: 2,
            id: 268395,
            country: "JP",
            sunrise: 1704577885,
            sunset: 1704613336,
        },
        timezone: 32400,
        id: 1850144,
        name: "東京都",
        cod: 200,
    })

    const successCallback = async (position: GeolocationPosition) => {
        console.log("successCallback")

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
            console.log("try")
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
                    console.log("otenki honbann run")
                    try {
                        const response = await fetch(
                            `https://api.openweathermap.org/data/2.5/weather?q=${pf}&appid=8b088bfd51d569c1bcd2db2dea01a24d&lang=ja`,
                        )
                        const data: WeatherInfoDto = await response.json()
                        setWeather(data)
                        localStorage.setItem(
                            "weatherData",
                            JSON.stringify(data),
                        )
                        localStorage.setItem("prefecture", pf)
                        console.log("success!!!!!!!!!!")
                        console.log(data)
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
        console.log("getLocation")

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    }

    const getOtenkiApi = () => {
        console.log("getOtenki")
        getLocation()

        // if (weather === undefined) {
        //     const localDataString = localStorage.getItem("weatherData")
        //     const localPrefecture = localStorage.getItem("prefecture")

        //     console.log(localDataString, localPrefecture)

        //     if (localDataString && localPrefecture) {
        //         const localWeather = JSON.parse(
        //             localDataString,
        //         ) as WeatherInfoDto
        //         setWeather(localWeather)
        //         setPrefecture(localPrefecture)
        //     } else {
        //         getLocation()
        //     }
        // }
    }

    return {
        getOtenkiApi,
        muniCd,
        prefecture,
        latlon,
        weather,
    }
}
