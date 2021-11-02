import React, { Component } from "react";
import { ReactMic } from "react-mic";

export default class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.roundCanvas = React.createRef();
  }

  draw() {
    const { audioData } = this.props;
    console.log(audioData);
    const roundCanvas = this.roundCanvas.current;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext("2d");
    const roundContext = roundCanvas.getContext("2d")
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;
    context.lineWidth = 2;
    roundContext.lineWidth = 20;
    roundContext.clearRect(0,0,300,300)
    roundContext.beginPath();
    context.strokeStyle = "#000000";
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(0, height / 2);

    let maxY = Number.MIN_SAFE_INTEGER

    for (const item of audioData) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;

      maxY = y > maxY ? y:maxY;
    }

    roundContext.strokeStyle = maxY > 160 ?'#FF0000':'#0000FF';

    roundContext.arc(100,75,40,0,2*Math.PI)

    roundContext.stroke()

    context.lineTo(x, height / 2);
    context.stroke();
  }

  componentDidUpdate() {
    this.draw();
  }

  render() {
    return (
      <div className="section">
     <div >
        <p className="title">circle color changes with respect to microphone input</p>
        <canvas width="400" height="400" ref={this.roundCanvas} />
     </div>
       <div style={{margin:'20px'}}>
        <p className="title">Sine wave with microphone Frequency</p>
        <canvas width="600" height="300" ref={this.canvas} />
       </div>
      </div>
    );
  }
}
