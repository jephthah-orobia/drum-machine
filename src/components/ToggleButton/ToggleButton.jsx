/**
 * A reusable React Stateless Component by Jephthah M. Orobia (c) 2022
 *
 * -Basically just your regular bootstrap toggle button
 *
 * -Requires bootstrap v5+
 * 
 * Example usage:
 * 
 *      <ToggleButton
            id="SustainToggle"
            isTrue={this.state.sustain}
            onChange={this.handleSustainToggleChange} 
            labelWhenFalse="SUSTAIN (off)"
            labelWhenTrue="SUSTAIN (on)"
            btnCLasses="btn-outline-warning m-1" // additional classes
          />
 * 
 * 
 */

import React from "react";

const ToggleButton = ({
  id = "ToggleButton" + Math.round(Math.random() * 1000), // This will be the id of the input[type=checkbox]. If not defined, a random id is generated.
  isTrue = true, // (boolean) The initial state of the toggle
  onChange, // callback function when toggled: f(e) => {}
  btnCLasses = "", // if additional classes is needed
  labelWhenFalse = "Turn On", // What to show when the state is off.
  labelWhenTrue = "Turn Off", // what to show when the state is on.
}) => (
  <React.Fragment>
    <input
      type="checkbox"
      className="btn-check"
      id={id}
      checked={isTrue}
      onChange={onChange}
      autoComplete="off"
    />
    <label className={"btn " + btnCLasses} htmlFor={id}>
      {!isTrue && labelWhenFalse}
      {isTrue && labelWhenTrue}
    </label>
  </React.Fragment>
);

export default ToggleButton;
