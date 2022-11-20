import React, { Component } from "react";
import DrumPad from "./components/DrumPad/DrumPad";
import VolumeSlider from "./components/VolumeSlider/volumeSlider";
import DropDown from "./components/DropDown/DropDown";
import drumkits from "./data/sampleBank";
import ToggleButton from "./components/ToggleButton/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import hotkeysMapping from "./components/keyboardEventsRouter";

// acquire drumkits configuration.
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
    currentSounds: [...drumkits.collection[0].sounds],
    currentlyPlaying: "- - -",
    masterVolume: 0.4,
    sustain: false,
    showSlider: true,
    power: true,
  };

  componentDidMount() {
    hotkeysMapping[" "] = [
      () => {
        if (!this.state.sustain) this.setState({ sustain: true });
        document.body.focus();
      },
      () => {
        if (this.state.sustain) this.setState({ sustain: false });
        document.body.focus();
      },
    ];
  }

  componentWillUnmount() {
    delete hotkeysMapping[" "];
  }

  //handles change of drumkit.
  handleOnDrumkitChange = (i) => {
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
      S.currentlyPlaying !== name ? S : { currentlyPlaying: "- - -" }
    );
  };

  handleSustainToggleChange = (e) => {
    this.setState({ sustain: e.target.checked });
    document.body.focus();
  };

  handleVolumesToggleChange = (e) => {
    this.setState({ showSlider: e.target.checked });
    document.body.focus();
  };

  handlePowerToggleChange = (e) => {
    let checkedValue = e.target.checked;
    this.setState({ power: checkedValue });
    document.querySelectorAll(".btn, .drum-pad, input").forEach((elem) => {
      if (elem !== e.target) elem.disabled = !checkedValue;
    });
    hotkeysMapping.enabled = checkedValue;
    document.body.focus();
  };

  render() {
    return (
      <div
        id="drum-machine"
        className="position-absolute top-50 start-50 translate-middle-x"
      >
        <div className="d-flex flex-row justify-content-between align-items-stretch flex-wrap">
          <ToggleButton
            id="PowerToggle"
            isTrue={this.state.power}
            onChange={this.handlePowerToggleChange}
            labelWhenFalse={<FontAwesomeIcon icon={faPowerOff} />}
            labelWhenTrue={<FontAwesomeIcon icon={faPowerOff} />}
            btnCLasses="btn-outline-success m-1 flex-fill flex-md-grow-0"
          />
          <DropDown
            onChange={this.handleOnDrumkitChange}
            selectedIndex={0}
            options={drumkits.collection.map((item) => item.name)}
            containerClassName="text-bg-dark my-0 py-0 flex-fill flex-sm-grow-0"
            btnClassName="btn-primary py-0 my-0"
            arrowClassName="btn-primary my-0 py-0"
          />

          <div
            id="display"
            className="btn btn-info text-center m-1 h4 flex-fill flex-grow-1"
          >
            {this.state.currentlyPlaying}
          </div>
          <ToggleButton
            id="SustainToggle"
            isTrue={this.state.sustain}
            onChange={this.handleSustainToggleChange}
            labelWhenFalse="SUSTAIN"
            labelWhenTrue="SUSTAIN"
            btnCLasses="btn-outline-warning m-1 flex-fill flex-md-grow-0"
          />
          <ToggleButton
            id="VolumesToggle"
            isTrue={this.state.showSlider}
            onChange={this.handleVolumesToggleChange}
            labelWhenFalse="Show Controls"
            labelWhenTrue="Hide Controls"
            btnCLasses="btn-outline-warning m-1 flex-fill flex-md-grow-0"
          />
        </div>
        <VolumeSlider
          volume={this.state.masterVolume}
          onVolumeChange={this.handleMasterVolumeChange}
          volumeDisplayClassName="form-control text-bg-info ms-1 px-1 fs-6 text-center border-info fw-bolder"
          sliderClassName="masterVolumeSlider"
          labelStyle={{
            fontWeight: "bolder",
            color: "var(--bs-info)",
            fontSize: "1.5rem",
          }}
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
      </div>
    );
  }
}

export default DrumMachine;
