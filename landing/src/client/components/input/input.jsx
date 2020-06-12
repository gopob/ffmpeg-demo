import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './input.styles.pcss';

const Input = ({ className, ...props }) => {
  return (
    <input
      className={classnames(styles.input, className)}
      {...props /* eslint-disable-line react/jsx-props-no-spreading */}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
};

Input.defaultProps = {
  className: '',
};

export default Input;
