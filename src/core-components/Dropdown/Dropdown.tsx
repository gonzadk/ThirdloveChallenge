import React from 'react';
import * as _ from 'lodash';

import './Dropdown.scss';

type DropdownProps = {
  title: string,
  options: any,
  idProperty: string,
  nameProperty: string
};
type DropdownState = {};
class Dropdown extends React.Component<DropdownProps, DropdownState> {
  RenderOptions(options: any, idProperty: string, nameProperty: string) {
    return (
      _.map(options, (option: any) => (
        <option key={option[idProperty]} value={option[idProperty]}>
          { option[nameProperty] }
        </option>
      ))
    )
  }

  render() {
    const { title, options, idProperty, nameProperty } = this.props;

    return (
      <div className="cc-dropdown">
        <span className="cc-dropdown__title"> { title } </span>
        <select className="cc-dropdown__select">
          {
            (options && options.length) && this.RenderOptions(options, idProperty, nameProperty)
          }
        </select>
      </div>
    );
  }
}

export default Dropdown;