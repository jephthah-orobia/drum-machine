import React, { Component } from "react";

class VolumeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 1,
    };
    if ("volume" in props) this.state.volume = props.volume;
  }

  handleNumberChange = (e) => {
    let newVolume = parseFloat((e.target.value / 100).toFixed(2));
    this.setState({ volume: newVolume });
    if ("onVolumeChange" in this.props) this.props.onVolumeChange(newVolume);
  };

  render() {
    return (
      <div
        className="d-grid"
        style={this.props.style}
        onMouseUp={this.handleOnMouseUp}
        onMouseMove={this.handleOnMouseMove}
      >
        <label className="d-flex justify-content-between">
          <div>{this.props.label}</div>
          <input
            className="d-inline col-6 mx-1"
            type="number"
            value={this.state.volume * 100}
            max="100"
            min="0"
            step={1}
            onChange={this.handleNumberChange}
          />
        </label>
        <input
          type="range"
          value={this.state.volume * 100}
          max={100}
          min={0}
          step={1}
          onChange={this.handleNumberChange}
        />
      </div>
    );
  }
}

export default VolumeSlider;
