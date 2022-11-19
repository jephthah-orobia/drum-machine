import React, { Component } from "react";
import DrumPad from "./components/DrumPad/DrumPad";
import VolumeSlider from "./components/VolumeSlider/volumeSlider";
import DropDown from "./components/DropDown/DropDown";
import * as sampleBankJSON from "./data/sampleBank.json";
import hotkeysMapping from "./components/keyboardEventsRouter";

const { drumkits } = sampleBankJSON; // acquire drumkits configuration.
/***
 *  drumkits is an array of "drumkit".
 *  a *drumkit* is basically just a collection of sound samples of each percussion in a drum set.
 *  each drumkit has the following properties:
 *    -- name // the name of the drumkit.
 *    -- folder // the folder where the drumkit is found.
 *    -- sounds[] // an array of sound objects
 *
 *  each sound object has the following properties:
 *    -- name // refers to the name of the percusion
 *    -- hotkey // prefered keyboard hotkey. Note: Should be upper case
 *    -- src // the path to the sound file.
 *
 *  the first defined drumkit is from the freeCodeCamp challenge (drumkits.fcssDrumKit)
 *  to add more drumkits, simply add the folder containing the drumkit to ./public/sample/
 *  then manually create the entry in ./data/sampleBank.json following the same scheme with drumkits.fccDrumKit.
 */

class DrumMachine extends Component {
  state = {
    currentDrumKit: drumkits.collection[0].name,
    currentSounds: drumkits.collection[0].sounds,
    currentlyPlaying: "- - -",
    masterVolume: 1.0,
    sustain: true,
    showSlider: true,
  };

  //handles change of drumkit.
  handleOnDrumkitChange = (i) => {
    //this.state.currentSounds.forEach((s) => delete hotkeysMapping[s.hotkey]);
    this.setState({
      currentDrumKit: drumkits.collection[i].name,
      currentSounds: [...drumkits.collection[i].sounds],
    });
  };

  handleMasterVolumeChange = (v) => {
    this.setState({ masterVolume: v });
  };

  handleOnPlay = (name) => {
    this.setState({
      currentlyPlaying: name,
    });
  };

  handleOnEnd = (name) => {
    this.setState((S) =>
      !S.currentlyPlaying.includes(name) ? S : { currentlyPlaying: "- - -" }
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="d-flex flex-row justify-content-between align-items-stretch flex-wrap">
          <DropDown
            onChange={this.handleOnDrumkitChange}
            selectedIndex={0}
            options={drumkits.collection.map((item) => item.name)}
          />

          <div
            id="display"
            className="row card text-success text-center m-1 h4 flex-fill"
          >
            {this.state.currentlyPlaying}
          </div>
          <input
            type="checkbox"
            className="btn-check"
            id="btn-check-outlined"
            checked={this.state.sustain}
            onChange={(e) => {
              this.setState({ sustain: e.target.checked });
            }}
            autoComplete="off"
          />
          <label
            className="btn btn-outline-primary m-1"
            htmlFor="btn-check-outlined"
          >
            {!this.state.sustain && "Turn on Sustain"}
            {this.state.sustain && "Turn off Sustain"}
          </label>
          <input
            type="checkbox"
            className="btn-check"
            id="btn-showSlider"
            checked={this.state.showSlider}
            onChange={(e) => {
              this.setState({ showSlider: e.target.checked });
            }}
            autoComplete="off"
          />
          <label
            className="btn btn-outline-primary m-1"
            htmlFor="btn-showSlider"
          >
            {!this.state.showSlider && "Show Controls"}
            {this.state.showSlider && "Hide Controls"}
          </label>
        </div>
        <VolumeSlider
          volume={this.state.masterVolume}
          onVolumeChange={this.handleMasterVolumeChange}
          label="Master Volume"
        />
        <div className="d-flex flex-row flex-wrap justify-content-around">
          {this.state.currentSounds.map((item, index) => (
            <DrumPad
              key={item.name}
              index={index}
              src={item.src}
              name={item.name}
              hotkey={item.hotkey}
              masterVolume={this.state.masterVolume}
              sustain={this.state.sustain}
              showSlider={this.state.showSlider}
              onPlay={this.handleOnPlay}
              onEnd={this.handleOnEnd}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default DrumMachine;
