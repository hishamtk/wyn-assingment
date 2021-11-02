
import React , {Component} from 'react'
import AudioVisualiser from './AudioVisualiser'

class AudioAnalyser extends Component{


    constructor(props){
        super(props)
        this.state = {audioData:new Uint8Array(0),bufferLength:0}
        this.tick = this.tick.bind(this)

    }

componentDidMount(){
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.analyser = this.audioContext.createAnalyser();

    this.analyser.minDecibels = -60;
    this.analyser.maxDecibels = -10;
    this.analyser.smoothingTimeConstant = 0.85;
    this.analyser.fftSize = 512;

  
    this.setState({bufferLength:this.analyser.frequencyBinCount})
   
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
   
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick)
}



tick(){
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({audioData:this.dataArray})
    this.rafId = requestAnimationFrame(this.tick)
}

componentWillUnmount(){
    cancelAnimationFrame(this.rafId)
    this.analyser.disconnect();
    this.source.disconnect();
}

render(){
    return <AudioVisualiser audioData={this.state.audioData} bufferLength={this.state.bufferLength} />
}

}

export default AudioAnalyser