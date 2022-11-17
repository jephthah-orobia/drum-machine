import React, { Component } from "react";

import keysMapping from "./keyboardEventsRouter";

class DrumPad extends Component {
  audioRef = React.createRef();
  btnRef = React.createRef();

  play = () => {
    this.audioRef.current.pause();
    this.audioRef.current.currentTime = 0;

    this.btnRef.current.classList.add("drum-pad-playing");
    this.audioRef.current.play();
    this.props.onPlay();
  };

  ended = () => {
    this.btnRef.current.classList.remove("drum-pad-playing");
    this.props.onEnd();
  };

  componentDidMount() {
    keysMapping[this.props.hotkey] = this.play;
  }

  componentWillUnmount() {
    delete keysMapping[this.props.hotkey];
  }

  render() {
    return (
      <button
        className="drum-pad"
        onClick={this.play}
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
        >
          <source src={this.props.src} alt={this.props.name} />
          Your browser doeos not support the audio element.
        </audio>
      </button>
    );
  }
}

export default DrumPad;
