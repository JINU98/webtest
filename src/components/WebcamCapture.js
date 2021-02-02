import React  from 'react'
import Webcam from "react-webcam";
import ReactDOM from 'react-dom';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
 
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  var count=1;
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
        {
          command:'select Media One',
          callback: () =>{
            document.getElementById("1").style.border="5px solid red"
          }

        },
        {
          command:'select media 2',
          callback: () =>{
            document.getElementById("2").style.border="5px solid red"
          }

        },
        {
          command:'select media 3',
          callback: () =>{
            document.getElementById("3").style.border="5px solid red"
          }

        },
        {
          command:'select media 4',
          callback: () =>{
            document.getElementById("4").style.border="5px solid red"
          }

        },
        {
          command:'select media five',
          callback: () =>{
            document.getElementById("5").style.border="5px solid red"
          }

        },
        {
          command:'select media vi',
          callback: () =>{
            document.getElementById("6").style.border="5px solid red"
          }

        },
        {
          command:'select media 7',
          callback: () =>{
            document.getElementById("7").style.border="5px solid red"
          }

        },
        {
          command:'select media 8',
          callback: () =>{
            document.getElementById("8").style.border="5px solid red"
          }

        },
        {
          command:'select media 9',
          callback: () =>{
            document.getElementById("9").style.border="5px solid red"
          }

        },
        {
          command:'select media 10',
          callback: () =>{
            document.getElementById("10").style.border="5px solid red"
          }

        },


      ]
  
    useSpeechRecognition({ commands })

    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

    const handleStartCaptureClick = React.useCallback(() => {
      // alert('started')
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
      // alert('stoped')
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);
  
    const handleDownload = React.useCallback(() => {
      
      if (recordedChunks.length) {
        // alert('sdsds')
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        
        const url =URL.createObjectURL(blob);
        const a = document.createElement("video");
        // alert(url)
        a.setAttribute("src",url)
        a.setAttribute("width",360)
        a.setAttribute("height",180)
        a.setAttribute("controls","controls")
        a.setAttribute("id",count++)
        a.style.margin="10px";
        document.getElementById('test1').appendChild(a);
        // a.download = "react-webcam-stream-capture.webm";
        // a.click();
        // window.URL.revokeObjectURL(url);
        setRecordedChunks([]); 
      }
    }, [recordedChunks]);


    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const b = document.createElement("img");
        b.setAttribute("src",imageSrc)
        b.setAttribute("height",200)
        b.setAttribute("width",400)
        b.setAttribute("id",count++)
        b.setAttribute("alt","sdsd")
        b.style.margin="10px";
        document.getElementById('test1').appendChild(b);
        // document.getElementById('test1').appendChild(b);

        // photos=photos.concat(<img height="200" width="400" id={count++} style={{ margin:"10px" }} src={imageSrc} alt="sdsds"/>)
        // ReactDOM.render(photos, document.getElementById('test1'));
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
          height={200}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={400}
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
        <div id='test1'>
          For Selecting Media say say select media then refernce number e.g <b>select media one </b><br/>

        </div>

      </>
    );
  };

  export default WebcamCapture;