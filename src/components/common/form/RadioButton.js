import React, { PureComponent } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

type Props = {
  onChange: () => {},
  onReset: () => {},
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
    const { options, selectedOption, ...rest } = this.props;
    return (
      <Form inline className="ml-auto">
        {options.map((option, index) => (
          <FormGroup className="ml-2" key={index}>
            <Label>
              <Input
                {...rest}
                type="radio"
                name={option.name}
                value={option.value}
                onChange={this.handleChange}
                checked={selectedOption === option.value}
              />
              {option.label}
            </Label>
          </FormGroup>
        ))}
      </Form>
    );
  }
}

export default RadioButton;
