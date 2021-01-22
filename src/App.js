import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import WebcamCapture from './components/WebcamCapture.js'

const Dictaphone = () => {

  

  const [message, setMessage] = useState('')
  const commands = [
    {
      command: 'Capture',
      callback: (food) => setMessage(`Done`)
    }
  ]

  const { transcript } = useSpeechRecognition({ commands })

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <div>
      <WebcamCapture></WebcamCapture>
 
      <p>{message}</p>
      <p>{transcript}</p>
    </div>
  )
}
export default Dictaphone