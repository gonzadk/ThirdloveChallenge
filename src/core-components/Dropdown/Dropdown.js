require('./Dropdown.scss');

import React from 'react';
import * as _ from 'lodash';

class Dropdown extends React.Component {
  RenderOptions({options, idProperty, nameProperty}) {
    return (
      !options.length ? null :
        _.map(options, option => (
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
          <this.RenderOptions options={options}
                              idProperty={idProperty}
                              nameProperty={nameProperty}/>
        </select>
      </div>
    );
  }
}

Dropdown.defaultProps = {};

export default Dropdown;