import React, { PureComponent } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

/* eslint-disable */
class RadioButton extends PureComponent {
  handleChange = event => {
    const { name, value } = event.target;
    console.log('event', name, value, event.target.checked);
    const { onChange } = this.props;
    onChange({ name, value });
  };

  render() {
    const { options, ...rest } = this.props;
    return (
      <Form inline className="ml-auto">
        {options.map((option, index) => (
          <FormGroup check className="ml-2" key={index}>
            <Label check>
              <Input
                {...rest}
                type="radio"
                name={option.name}
                value={option.value}
                onChange={this.handleChange}
                defaultChecked={option.defaultChecked}
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
