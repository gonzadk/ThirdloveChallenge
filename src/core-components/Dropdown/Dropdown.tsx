import React from 'react';
import * as _ from 'lodash';

import './Dropdown.scss';

type DropdownProps = {
  onChange(change: any): void,
  options: any,
  property: string
  title: string,
  value: number
};
type DropdownState = {};
class Dropdown extends React.Component<DropdownProps, DropdownState> {
  /**
   * Generates the options to be rendered depending on the props
   */
  renderOptions() {
    const { options, property } = this.props;

    return (
      _.map(options, (option: any, index: number) => (
        <option key={option[property]} value={index}>
          { option[property] }
        </option>
      ))
    )
  }

  render() {
    const { title, options, onChange, value } = this.props;

    return (
      <div className="cc-dropdown">
        <span className="cc-dropdown__title"> { title } </span>
        <select className="cc-dropdown__select" onChange={onChange} value={value}>
          {
            (options && options.length) && this.renderOptions.bind(this)()
          }
        </select>
      </div>
    );
  }
}

export default Dropdown;