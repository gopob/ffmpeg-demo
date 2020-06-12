import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';

import styles from './input.styles';


export default class Input extends PureComponent {
  onChange = (e) => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  errors() {
    const { errors } = this.props;
    if (!errors.length) {
      return null;
    }

    return (
      <div className={styles.errors}>
        {_.uniq(errors).join(', ')}
      </div>
    );
  }

  render() {
    const { className, errors } = this.props;
    const props = _.omit(this.props, ['className', 'errors', 'onChange']);

    return (
      <div>
        <input
          className={classnames(styles.input, className, {
            [styles.error]: errors.length,
          })}
          onChange={this.onChange}
          {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        />

        {this.errors()}
      </div>
    );
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['text', 'search', 'email', 'number', 'password', 'url']),
  errors: PropTypes.arrayOf(PropTypes.string),
};

Input.defaultProps = {
  className: '',
  type: 'text',
  errors: [],
};
