import { useState, useCallback, useEffect } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState({
    length: 8,
    numberAllowed: false,
    charAllowed: false,
    password: ''
  })

  // const [length, setLength] = useState(8)
  // const [numberAllowed, setNumberAllowed] = useState(false)
  // const [charAllowed, setCharAllowed] = useState(false)
  // const [password, setPassword] = useState('')


  const generatorPassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUUVWXYZabcdefghijklmnopqrestuvwxyz'

    if (data.numberAllowed) str += '0123456789'
    if (data.charAllowed) str += '!@#$%^&*()'
    for (let i = 1; i < data.length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setData(prevData => ({ ...prevData, password: pass }))
  }, [data])


  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(data.password)
  }

  const handlePasswordGenerator = () => {
    generatorPassword()
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
            onChange={(e) => {
              handlePasswordGenerator()

              setData(prevData => ({ ...prevData, length: parseInt(e.target.value) }))
            }}
          />
          <label htmlFor="length">{data.length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={data.numberAllowed}
            onChange={() => {
              setData(prevData => ({ ...prevData, numberAllowed: !prevData.numberAllowed }))
              handlePasswordGenerator()
            }}
            name=""
            id=""
          />
          <label htmlFor="number">Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={data.charAllowed}
            onChange={() => {
              setData(prevData => ({ ...prevData, charAllowed: !prevData.charAllowed }))
              handlePasswordGenerator()
            }}
            name=""
            id=""
          />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
