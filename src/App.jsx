import { useState, useCallback, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState({
    length: 8,
    numberAllowed: false,
    charAllowed: false,
    password: ''
  })

  const generatorPassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (data.numberAllowed) str += '0123456789'
    if (data.charAllowed) str += '!@#$%^&*()'
    for (let i = 0; i < data.length; i++) { // Start from 0 and loop until length
      const char = Math.floor(Math.random() * str.length) // Correct the random index calculation
      pass += str.charAt(char)
    }

    setData(prevData => ({ ...prevData, password: pass }))
  }, [data])

  useEffect(() => {
    generatorPassword()
  }, [data.length, data.numberAllowed, data.charAllowed]) // Trigger password generation on dependency changes

  useEffect(() => {
    generatorPassword() // Generate initial password on mount
  }, [])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(data.password)
  }

  const handlePasswordGenerator = (newData) => {
    setData(prevData => ({ ...prevData, ...newData }))
  }

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={data.password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
          Copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={data.length}
            className='cursor-pointer'
            onChange={(e) => handlePasswordGenerator({ length: parseInt(e.target.value) })}
          />
          <label htmlFor="length">{data.length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            checked={data.numberAllowed}
            onChange={() => handlePasswordGenerator({ numberAllowed: !data.numberAllowed })}
            name="number"
            id="number"
          />
          <label htmlFor="number">Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            checked={data.charAllowed}
            onChange={() => handlePasswordGenerator({ charAllowed: !data.charAllowed })}
            name="charInput"
            id="charInput"
          />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
