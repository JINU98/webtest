import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import WebcamCapture from './components/WebcamCapture.js'
import Demo from './components/Demo.js'

const Dictaphone = () => {

  

  const [message, setMessage] = useState('')
  const commands = [
    {
      command: 'Capture',
      callback: () => setMessage(`Done`)
    }
  ]

  const { transcript } = useSpeechRecognition({ commands })

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <div>
      {/* <Demo></Demo> */}
      <h1> Press space button and say capture </h1>
      <WebcamCapture></WebcamCapture>
      <br />
      <p>{message}</p>
      <p>{transcript}</p>



    </div>
  )
}
export default Dictaphone