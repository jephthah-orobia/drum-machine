import React, { Component } from "react";
import VolumeSlider from "../VolumeSlider/volumeSlider";
import keysMapping from "../keyboardEventsRouter";

class DrumPad extends Component {
  state = {
    volume: 1,
  };

  audioRef = React.createRef();
  btnRef = React.createRef();

  componentDidMount() {
    keysMapping[this.props.hotkey] = [this.play, this.forceEnd];
  }

  componentWillUnmount() {
    delete keysMapping[this.props.hotkey];
  }

  play = () => {
    this.audioRef.current.pause();
    this.audioRef.current.currentTime = 0;
    this.audioRef.current.volume = this.state.volume * this.props.masterVolume;

    this.btnRef.current.classList.add("drum-pad-playing");
    this.audioRef.current.play();
    this.props.onPlay(this.props.name);
  };

  forceEnd = () => {
    if (!this.props.sustain) {
      this.audioRef.current.pause();
      this.audioRef.current.currentTime = 0;
      this.ended(this.props.name);
    }
  };

  ended = () => {
    this.btnRef.current.classList.remove("drum-pad-playing");
    this.props.onEnd(this.props.name);
  };

  handleVolumeChange = (newVol) => {
    this.setState({ volume: newVol });
    this.audioRef.current.volume = newVol * this.props.masterVolume;
  };

  render() {
    return (
      <div className="drum-pad-container">
        {this.props.showSlider && (
          <VolumeSlider
            volume={this.state.volume}
            label={this.props.name}
            onVolumeChange={(newVol) => this.setState({ volume: newVol })}
          />
        )}
        <button
          className="drum-pad mx-auto"
          onMouseDown={this.play}
          onMouseUp={this.forceEnd}
          ref={this.btnRef}
          id={this.props.name.replace(" ", "-")}
        >
          {this.props.hotkey}
          <audio
            ref={this.audioRef}
            id={this.props.hotkey}
            onEnded={this.ended}
            className="clip"
            src={this.props.src}
            alt={this.props.name}
          ></audio>
        </button>
      </div>
    );
  }
}

export default DrumPad;
