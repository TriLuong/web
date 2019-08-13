import React, { PureComponent } from 'react';
import Select from 'react-select';

type Props = {
  className: String,
};
class SelectField extends PureComponent<Props> {
  render() {
    const { className, ...rest } = this.props;
    return (
      <div className={`wrap-select ${className}`}>
        <Select
          {...rest}
          clearable={false}
          className="wrap-select__inner"
          classNamePrefix="wrap-select"
          isSearchable={false}
          navPrev={null}
        />
      </div>
    );
  }
}
export default SelectField;
