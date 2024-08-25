'use client'

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/store'
import { setWeatherData } from '@/lib/features/weather/weatherSlice'
import SearchInput from '@/components/SearchInput'
import Link from 'next/link'
import LOCALITIES from '@/localities'

const WeatherPage = () => {
  const localityId = useSelector((state: RootState) => state.weather.localityId)
  const weatherData = useSelector((state: RootState) => state.weather.data)
  const dispatch = useDispatch()
  const [localityName, setLocalityName] = useState('')

  useEffect(() => {
    const savedWeatherData = localStorage.getItem('weatherData')
    const savedLocalityName = localStorage.getItem('localityName')

    if (savedWeatherData && savedLocalityName) {
      dispatch(setWeatherData(JSON.parse(savedWeatherData)))
      setLocalityName(savedLocalityName)
    } else if (localityId) {
      fetch(
        `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${localityId}`,
        {
          headers: {
            'X-Zomato-Api-Key': '352bfabc8560b5668a8a1e8369d99e23',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch(setWeatherData(data.locality_weather_data))
          localStorage.setItem(
            'weatherData',
            JSON.stringify(data.locality_weather_data)
          )
        })

      const matchedLocality = LOCALITIES.find(
        (locality) => locality.locality_id === localityId
      )
      if (matchedLocality) {
        setLocalityName(matchedLocality.locality)
        localStorage.setItem('localityName', matchedLocality.locality)
      }
    }
  }, [localityId, dispatch])

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4 relative">
      <div className="absolute top-4 left-4">
        <Link
          href={'/'}
          className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
      <div className="w-full max-w-2xl mt-10">
        <SearchInput />
      </div>
      <div className="w-full max-w-2xl mt-10 p-6 bg-white rounded-lg shadow-lg border-2 border-gray-300 transform transition duration-500 hover:scale-105">
        {weatherData ? (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Weather Details: {localityName}
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-lg font-medium text-gray-700 bg-blue-100 p-2 rounded-lg border border-blue-200">
                Temperature:{' '}
                <span className="font-bold">{weatherData.temperature}°C</span>
              </p>
              <p className="text-lg font-medium text-gray-700 bg-blue-100 p-2 rounded-lg border border-blue-200">
                Humidity:{' '}
                <span className="font-bold">{weatherData.humidity}%</span>
              </p>
              <p className="text-lg font-medium text-gray-700 bg-blue-100 p-2 rounded-lg border border-blue-200">
                Wind Speed:{' '}
                <span className="font-bold">{weatherData.wind_speed} km/h</span>
              </p>
              <p className="text-lg font-medium text-gray-700 bg-blue-100 p-2 rounded-lg border border-blue-200">
                Wind Direction:{' '}
                <span className="font-bold">{weatherData.wind_direction}°</span>
              </p>
              <p className="text-lg font-medium text-gray-700 bg-blue-100 p-2 rounded-lg border border-blue-200">
                Rain Intensity:{' '}
                <span className="font-bold">
                  {weatherData.rain_intensity} mm/h
                </span>
              </p>
              <p className="text-lg font-medium text-gray-700 bg-blue-100 p-2 rounded-lg border border-blue-200">
                Rain Accumulation:{' '}
                <span className="font-bold">
                  {weatherData.rain_accumulation} mm
                </span>
              </p>
            </div>
          </div>
        ) : (
          <p className="text-lg text-center text-gray-700">Loading...</p>
        )}
      </div>
    </div>
  )
}

export default WeatherPage
