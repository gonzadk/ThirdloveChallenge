import React from 'react';
import * as _ from 'lodash';

import './Dropdown.scss';

type MyProps = {
  title: string,
  options: any,
  idProperty: string,
  nameProperty: string
};
type MyState = {};
class Dropdown extends React.Component<MyProps, MyState> {
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
        <span> { title } </span>
        <select>
          {
            (options && options.length) && this.RenderOptions(options, idProperty, nameProperty)
          }
        </select>
      </div>
    );
  }
}

export default Dropdown;