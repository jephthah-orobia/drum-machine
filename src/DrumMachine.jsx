import React, { Component } from "react";
import DrumPad from "./components/DrumPad";
import * as sampleBankJSON from "./data/sampleBank.json";

const { drumkits } = sampleBankJSON;

class DrumMachine extends Component {
  state = {
    currentBank: 0,
    bankCollection: [drumkits.fccDrumKit],
    soundsRef: [],
    currentlyPlaying: "",
  };

  render() {
    return (
      <React.Fragment>
        <div id="display" className="container">
          {this.state.currentlyPlaying}
        </div>
        {this.state.bankCollection[this.state.currentBank].sounds.map(
          (item) => (
            <DrumPad
              src={item.src}
              name={item.name}
              hotkey={item.hotkey}
              key={item.name}
              onPlay={() => this.setState({ currentlyPlaying: item.name })}
              onEnd={() =>
                this.setState((S) =>
                  S.currentlyPlaying === item.name
                    ? { currentlyPlaying: "" }
                    : S
                )
              }
            />
          )
        )}
      </React.Fragment>
    );
  }
}

export default DrumMachine;
