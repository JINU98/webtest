import React, { useState,useRef,useCallback } from 'react'
import Webcam from "react-webcam";
import ReactDOM from 'react-dom';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


    
 
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
   
  const WebcamCapture = () => {

    const commands = [
        {
          command: 'Capture',
          callback: () => capture()
        }
      ]
    
      const { transcript } = useSpeechRecognition({ commands })

    const webcamRef = React.useRef(null);
   
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const image1=<img src={imageSrc} />
        ReactDOM.render(<img src={imageSrc} />, document.getElementById('test1'));
      },
      [webcamRef]
    );
   
    return (
      <>
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        <br />
      <h1> Press start button and say capture </h1>

        &nbsp;
        <button onClick={capture} class="btn btn-primary">Capture photo</button>
        &nbsp;
        <button onClick={SpeechRecognition.startListening} class="btn btn-primary">Start</button>
        &nbsp;
      <button onClick={SpeechRecognition.stopListening} class="btn btn-primary">Stop</button>
        <div id='test1'></div>
      </>
    );
  };

  export default WebcamCapture;