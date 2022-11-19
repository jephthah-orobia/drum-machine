import React, { Component } from "react";
import DrumPad from "./components/DrumPad";
import hotkeysMapping from "./components/keyboardEventsRouter";
import VolumeSlider from "./components/VolumeSlider/volumeSlider";
import * as sampleBankJSON from "./data/sampleBank.json";
import { GetDivisors } from "./modules/MathExt";

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
    currentBank: drumkits.collection[0].name,
    currentSounds: drumkits.collection[0].sounds,
    currentlyPlaying: "- - -",
    masterVolume: 1.0,
    sustain: true,
    showSlider: true,
    rowLimit: 3,
  };

  //handles change of drumkit.
  handleOnSelectChange = (e) => {
    for (let hotkey in hotkeysMapping) delete hotkeysMapping[hotkey];
    this.setState({
      currentBank: drumkits.collection[e.target.value].name,
      currentSounds: drumkits.collection[e.target.value].sounds,
      rowLimit: GetDivisors(
        drumkits.collection[e.target.value].sounds.length
      ).sort((a, b) => a[1] / a[0] - b[1] / b[0])[0][1],
    });
  };

  handleMasterVolumeChange = (v) => {
    this.setState({ masterVolume: v });
  };

  render() {
    return (
      <React.Fragment>
        <div className="d-flex flex-row justify-content-between align-items-stretch">
          <select onChange={this.handleOnSelectChange} className="m-1 h5">
            {drumkits.collection.map((item, i) => (
              <option key={i} value={i}>
                {item.name}
              </option>
            ))}
          </select>
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
        </div>
        <VolumeSlider
          volume={this.state.masterVolume}
          onVolumeChange={this.handleMasterVolumeChange}
          label="Master Volume"
        />
        <div>
          {this.state.currentSounds.map((item, index) => (
            <DrumPad
              key={index}
              index={index}
              src={item.src}
              name={item.name}
              hotkey={item.hotkey}
              masterVolume={this.state.masterVolume}
              sustain={this.state.sustain}
              showSlider={this.state.showSlider}
              rowLimit={this.state.rowLimit}
              onPlay={() =>
                this.setState({
                  currentlyPlaying: item.name,
                })
              }
              onEnd={() =>
                this.setState((S) =>
                  !S.currentlyPlaying.includes(item.name)
                    ? S
                    : { currentlyPlaying: "- - -" }
                )
              }
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default DrumMachine;
