'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setLocalityId } from '@/lib/features/weather/weatherSlice'
import LOCALITIES from '@/localities'

const SearchInput = () => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const router = useRouter()
  const dispatch = useDispatch()

  const handleSearch = (locality_id: string, locality_name: string) => {
    dispatch(setLocalityId(locality_id))
    setQuery(locality_name)
    localStorage.removeItem('weatherData')
    localStorage.removeItem('localityName')
    setSuggestions([])
    router.push('/weather')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.length > 2) {
      const filteredSuggestions = LOCALITIES.filter((locality) =>
        locality.locality.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filteredSuggestions)
    } else {
      setSuggestions([])
    }
  }

  return (
    <div className="flex flex-col items-center justify-center font-sans">
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </span>
        <input
          type="text"
          className="w-full h-12 pl-10 pr-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={handleChange}
          placeholder="Search for a locality..."
        />
      </div>
      <ul className="bg-white border border-gray-300 w-96 mt-2 rounded-lg shadow-lg">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.locality_id}
            onClick={() =>
              handleSearch(suggestion.locality_id, suggestion.locality)
            }
            className="cursor-pointer p-2 hover:bg-gray-200"
          >
            {suggestion.locality}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchInput
