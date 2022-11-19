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
    newVolume = newVolume < 0 ? 0 : newVolume > 100 ? 100 : newVolume;
    this.setState({ volume: newVolume });
    if ("onVolumeChange" in this.props) this.props.onVolumeChange(newVolume);
  };

  render() {
    return (
      <div className="d-flex flex-column" style={this.props.style}>
        <label className="d-flex flex-row justify-content-between flex-nowrap align-middle">
          <div className="flex-fill flex-grow-1 align-middle d-inline-block text-truncate mr-2">
            {this.props.label}
          </div>
          <input
            className="form-control text-bg-secondary ms-1 px-1 text-center"
            type="text"
            value={this.state.volume * 100}
            inputMode="numeric"
            pattern="[0-9]*"
            style={{
              minWidth: "2.1rem",
              maxWidth: "2.4rem",
              borderWidth: "1px",
              padding: 1,
            }}
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
