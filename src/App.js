

import React, { useState } from 'react';

import AudioAnalyser from './Components/AudioAnalyser';
import Footer from './Components/Footer';
import Header from './Components/Header';
import SongPlayer from './Components/SongPlayer';

import songFile from "./static/a.mp3"


function App() {

  const [audio ,setAudio] = useState(null)
  const [song,setSong] = useState({data : new Audio(songFile),isPlaying:false})

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

  const changePlaying = () =>{
    let isPlaying = song.isPlaying;
    setSong({...song,isPlaying:!isPlaying})
  }

  return (
    <>
    <Header />
    <main className="App">
        <div className="controls">
          <button className="button" onClick={toogleMicrophone}>{audio?'Stop microphone':'Get microphone input'}</button>
          <SongPlayer audio={song.data} isPlaying={song.isPlaying} changePlay={changePlaying} />
          <p>{audio ? 'Speak something to see the sinewave dancing':""}</p>
        </div>
        {audio?<AudioAnalyser audio={audio} />:""}

          
      </main>

      <Footer />
      </>
  );
}

export default App;

