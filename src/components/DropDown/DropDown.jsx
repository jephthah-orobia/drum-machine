import React, { Component } from "react";

class DropDown extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    if (
      "options" in props &&
      "selectedIndex" in props &&
      props.selectedIndex >= 0 &&
      props.selectedIndex <= props.options.length
    )
      this.state = {
        current: props.selectedIndex,
      };
  }

  handleItemClick = (i) => {
    this.setState({ current: i });
    this.onChange(i);
  };

  render() {
    return (
      <div className="btn-group">
        <button
          type="button"
          className={"btn btn-outline-primary " + this.props.className}
          onClick={this.props.onCurrentClick}
        >
          {this.props.options[this.state.current]}
        </button>
        <button
          type="button"
          className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu">
          {this.props.options
            .map((item, i) => (
              <li key={i}>
                <button onClick={() => this.handleItemClick(i)}>{item}</button>
              </li>
            ))
            .filter((item, i) => i !== this.state.current)}
        </ul>
      </div>
    );
  }
}

export default DropDown;
