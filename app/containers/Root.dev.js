import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
// import DevTools from './DevTools';
import { Router } from 'react-router';
import routes from '../routes';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class Root extends Component {
    render() {
        const { store, history } = this.props;
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <div>
                        <Router history={history} routes={routes} />
                    </div>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
