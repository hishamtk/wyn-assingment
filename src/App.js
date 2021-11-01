

import React, { useState } from 'react';
import AudioAnalyser from './Components/AudioAnalyser';
import Footer from './Components/Footer';
import Header from './Components/Header';

function App() {

  const [audio ,setAudio] = useState(null)

  const  getMicrophone =async () =>{
    const audio  = await navigator.mediaDevices.getUserMedia({
      audio:true,
      video:false
    })
    setAudio(audio)
  }

  const stopMicrophone = () =>{
    audio.getTracks().forEach(track=>track.stop())
    setAudio(null)
  }

  const toogleMicrophone = () =>{
    if(audio){
      stopMicrophone();
    }else{
      getMicrophone()
    }
  }

  return (
    <>
    <Header />
    <main className="App">
        <div className="controls">
          <button onClick={toogleMicrophone}>{audio?'Stop microphone':'Get microphone input'}</button>
        </div>
        {audio?<AudioAnalyser audio={audio} />:""}
      </main>

      <Footer />
      </>
  );
}

export default App;

