import React, { PureComponent } from 'react';
import InputGroup from './GroupInput';

type Props = {
  onChange: () => {},
  onReset: () => {},
  className: String,
  classNameRadio: String,
  options: [],
  id: String,
  selectedOption: String,
};
class RadioButton extends PureComponent<Props> {
  handleChange = event => {
    // console.log('event', event.target.value, event);
    const { value } = event.target;
    const { onChange } = this.props;
    onChange({ value });
  };

  render() {
    const { options, selectedOption, className, classNameRadio, ...rest } = this.props;
    return (
      <div className={`${className} form-inline`}>
        {options.map((option, index) => (
          <div className={`${classNameRadio} form-group`} key={index}>
            <InputGroup
              {...rest}
              type="radio"
              name={option.name}
              value={option.value}
              onChange={this.handleChange}
              checked={selectedOption === option.value}
              label={option.label}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default RadioButton;
