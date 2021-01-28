import React  from 'react'
import Webcam from "react-webcam";
import ReactDOM from 'react-dom';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
 
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
   
  const WebcamCapture = () => {

    var photos=[];
    const commands = [
        {
          command: 'Capture',
          callback: () => capture()
        },
        {
          command: 'start',
          callback: () => handleStartCaptureClick()
        },
        {
          command: 'stop',
          callback: () => handleStopCaptureClick()

        },

      ]
  
    const { transcript } = useSpeechRecognition({ commands })

    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

    const handleStartCaptureClick = React.useCallback(() => {
      alert('started')
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);


    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );

    const handleStopCaptureClick = React.useCallback(() => {
      alert('stoped')
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);
  
    const handleDownload = React.useCallback(() => {
      if (recordedChunks.length) {
        alert('sdsds')
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        
        const url =URL.createObjectURL(blob);
        const a = document.createElement("video");
        // alert(url)
        a.setAttribute("src",url)
        a.setAttribute("width",400)
        a.setAttribute("controls","controls")
        a.style.margin="10px";
        document.getElementById('lets').appendChild(a);
        // a.download = "react-webcam-stream-capture.webm";
        // a.click();
        // window.URL.revokeObjectURL(url);
        setRecordedChunks([]); 
      }
    }, [recordedChunks]);


    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        photos=photos.concat(<img height="200" width="400" style={{ margin:"10px" }} src={imageSrc} alt="sdsds"/>)
        ReactDOM.render(photos, document.getElementById('test1'));
      },
      [webcamRef]
    );
   
    document.body.onkeydown = function (e) {
      if (e.keyCode === 32) {
          // alert("pressed")
          SpeechRecognition.startListening({ continuous: true })
         
        }
      }
      document.body.onkeyup = function (e) {
        if (e.keyCode === 32) {
            SpeechRecognition.stopListening()
          }
        }
    

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
      <h1> Press space button and say capture </h1>
      <h2> Press space button and say start to start recording press stop to stop recording </h2>

        &nbsp;
        <button onClick={capture} class="btn btn-primary">Capture photo</button>
        &nbsp;
        {/* <button onClick={SpeechRecognition.startListening} class="btn btn-primary">Start</button> */}
        &nbsp;
      {/* <button onClick={SpeechRecognition.stopListening} class="btn btn-primary">Stop</button> */}

      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 ? handleDownload() : null }
        <div id='test1'></div>
        <div id='lets' controls></div>

      </>
    );
  };

  export default WebcamCapture;