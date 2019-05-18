import React from 'react';

import './ColorPicker.scss';
import * as _ from 'lodash';

type ColorPickerProps = {
  colors: string[],
  selectedColor: string,
  onChange(color: string): void
};
type ColorPickerState = {};
class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
  /**
   * Generates the color circles
   */
  getColorTemplates() {
    const { colors, selectedColor, onChange } = this.props;

    return _.map(colors, (color: string) => {
      const style = { backgroundColor: color };
      const selectedClass = selectedColor === color ? 'cc-color-picker__color--selected' : '';

      return <div key={color}
                  className={`cc-color-picker__color ${selectedClass}`}
                  style={style}
                  onClick={() => onChange(color)}/>;
    });
  }

  render() {
    return (
      <section className="cc-color-picker">
        { this.getColorTemplates.bind(this)() }
      </section>
    );
  }
}

export default ColorPicker;