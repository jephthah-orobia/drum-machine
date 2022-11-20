import React, { Component } from "react";

class DropDown extends Component {
  constructor(props) {
    super(props);
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
    this.props.onChange(i);
  };

  render() {
    return (
      <div className={"btn-group " + this.props.containerClassName}>
        <button
          type="button"
          className={"btn " + this.props.btnClassName}
          onClick={this.props.onCurrentClick}
        >
          {this.props.options[this.state.current]}
        </button>
        <button
          type="button"
          className={
            "btn dropdown-toggle dropdown-toggle-split " +
            this.props.arrowClassName
          }
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul className={"dropdown-menu " + this.props.dropdownClassName}>
          {this.props.options
            .map((item, i) => (
              <li key={i}>
                <button
                  className="btn text-truncate"
                  onClick={() => this.handleItemClick(i)}
                >
                  {item}
                </button>
              </li>
            ))
            .filter((item, i) => i !== this.state.current)}
        </ul>
      </div>
    );
  }
}

export default DropDown;
