import SearchInput from '@/components/SearchInput'
import React from 'react'

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800">
          <span className="text-blue-500">W</span>
          <span className="text-red-500">e</span>
          <span className="text-yellow-500">a</span>
          <span className="text-blue-500">t</span>
          <span className="text-green-500">h</span>
          <span className="text-red-500">e</span>
          <span className="text-yellow-500">r</span>
          <span className="text-blue-500"> </span>
          <span className="text-green-500">A</span>
          <span className="text-red-500">p</span>
          <span className="text-yellow-500">p</span>
          <span className="text-blue-500">l</span>
          <span className="text-green-500">i</span>
          <span className="text-red-500">c</span>
          <span className="text-yellow-500">a</span>
          <span className="text-blue-500">t</span>
          <span className="text-green-500">i</span>
          <span className="text-red-500">o</span>
          <span className="text-yellow-500">n</span>
        </h1>
      </div>
      <SearchInput />
    </div>
  )
}

export default Home
