import React, { Component } from 'react'


export class SongPlayer extends Component {

    
  
    
      // Main function to handle both play and pause operations
      playPause = () => {
    
        // Get state of song
        let isPlaying = this.props.isPlaying;
    
        if (isPlaying) {
          // Pause the song if it is playing
          this.props.audio.pause();
        } else {
    
          // Play the song if it is paused
          this.props.audio.play();
        }
    
        // Change the state of song
       this.props.changePlay()
      };
    
      render() {
        return (
          <>
            {/* Show state of song on website */}
           
    
            {/* Button to call our main function */}
            <button onClick={this.playPause}>
              
              {this.props.isPlaying? 'Pause':'Play'} Song
            </button>
          </>
        );
      }
}

export default SongPlayer
