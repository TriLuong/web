import React, { PureComponent } from 'react';

type Props = {
  name: String,
  label: String,
};

/* eslint jsx-a11y/label-has-associated-control: 0 jsx-a11y/label-has-for: 0 */
class Switches extends PureComponent<Props> {
  handleChange = event => {
    const { value, name } = event.target;
    // const { onChange } = this.props;
    console.log('event', name, value);

    // onChange({ value });
  };

  render() {
    const { name, label } = this.props;
    return (
      <div className="custom-control custom-switch ml-5">
        <input
          name={name}
          type="checkbox"
          className="form-control custom-control-input"
          id="customSwitch1"
          onChange={this.handleChange}
        />
        <label className="custom-control-label" htmlFor="customSwitch1">
          {label}
        </label>
      </div>
    );
  }
}

export default Switches;
