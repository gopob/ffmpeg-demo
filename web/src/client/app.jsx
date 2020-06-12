import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import store from 'resources/store';
import history from 'services/history.service';

import Loading from 'components/loading';
import { ErrorBoundary } from 'components/error-boundary';

import { routes } from 'routes';
import AuthLayout from 'layouts/auth';
import Default from 'pages/default';
import NotFound from 'pages/not-found';

import 'styles/global';

const pages = {
  [routes.default.name]: Default,
};

const spaces = [
  {
    name: 'public',
    layout: AuthLayout,
    routes: Object.values(routes).filter((r) => r.private === false),
  },
];

export function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ErrorBoundary fallback={<h1>Error!</h1>}>
          <Switch>
            {spaces.map((space) => (
              <Route
                key={space.name}
                exact
                path={space.routes.map((r) => r.path)}
              >
                <space.layout>
                  <React.Suspense fallback={<Loading />}>
                    <Switch>
                      {space.routes.map((route) => (
                        <Route
                          key={route.name}
                          exact={route.exact}
                          path={route.path}
                          component={pages[route.name]}
                        />
                      ))}
                    </Switch>
                  </React.Suspense>
                </space.layout>
              </Route>
            ))}
            <Route path="*" component={NotFound} />
          </Switch>
        </ErrorBoundary>
      </ConnectedRouter>
    </Provider>
  );
}
