import React, { Component } from "react";
import VolumeSlider from "./VolumeSlider/volumeSlider";
import keysMapping from "./keyboardEventsRouter";

class DrumPad extends Component {
  state = {
    volume: 1,
  };

  audioRef = React.createRef();
  btnRef = React.createRef();

  play = () => {
    this.audioRef.current.pause();
    this.audioRef.current.currentTime = 0;

    this.btnRef.current.classList.add("drum-pad-playing");
    this.audioRef.current.play();
    this.props.onPlay();
  };

  forceEnd = () => {
    if (!this.props.sustain) {
      this.audioRef.current.pause();
      this.audioRef.current.currentTime = 0;
      this.ended();
    }
  };

  ended = () => {
    this.btnRef.current.classList.remove("drum-pad-playing");
    this.props.onEnd();
  };

  componentDidMount() {
    keysMapping[this.props.hotkey] = [this.play, this.forceEnd];
  }

  componentWillUnmount() {
    delete keysMapping[this.props.hotkey];
  }

  handleVolumeChange = (newVol) => {
    this.setState({ volume: newVol });
    this.audioRef.current.volume = newVol * this.props.masterVolume;
  };

  render() {
    return (
      <div
        className="drum-pad-container"
        style={{
          gridColumn:
            ((this.props.index + 1) % 3) + " / " + ((this.props.index + 2) % 3),
        }}
      >
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
            volume={this.state.volume * this.props.masterVolume}
          >
            <source src={this.props.src} alt={this.props.name} />
            Your browser doeos not support the audio element.
          </audio>
        </button>
      </div>
    );
  }
}

export default DrumPad;
