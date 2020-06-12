import { generatePath } from 'react-router-dom';

const defaults = {
  url(options = {}) {
    return {
      ...options,
      pathname: generatePath(this.path, options.params),
    };
  },
};

export const routes = {
  default: {
    ...defaults,
    name: 'default',
    path: '/',
    exact: false,
    private: false,
  },
  notFound: {
    ...defaults,
    name: 'notFound',
    path: '/404',
  },
};
