import React from 'react';

import './Button.scss';

type ButtonProps = {
  onClick: (event: any) => void,
  label: string
};
type ButtonState = {};
class Button extends React.Component<ButtonProps, ButtonState> {
  render() {
    return (
      <button className="cc-button"
              onClick={this.props.onClick}>{ this.props.label }
      </button>
    )
  }
}

export default Button;