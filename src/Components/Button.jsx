import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* eslint-disable react/prop-types */
const Button = ({
  children,
  className,
  disabled,
  handleClick,
}) => (
  <button
    className={className}
    type="button"
    disabled={disabled}
    onClick={handleClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  handleClick: () => {},
};

/* eslint-disable no-confusing-arrow */
const StyledButton = styled(Button)`
  border: 1px solid red;
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
`;

export default StyledButton;
