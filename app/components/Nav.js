import React, { PropTypes, Component } from 'react';

// import {connect} from 'react-redux';
// import {Link} from 'react-router';
// import routes from '../routes';
import { browserHistory } from 'react-router';

import AppBar from 'material-ui/AppBar';

class Nav extends Component {

    titulotap() {
        console.log('Return home');
        browserHistory.push('/');
    }

    render() {
        console.log('render');
        return (
            <AppBar
                title="KGE-Webapp"
                style={{position: 'fixed', height: '66px'}}
                onLeftIconButtonTouchTap={this.props.menuClick}
                onTitleTouchTap={this.titulotap}
            />
        );
    }
}

Nav.displayName = 'Nav';
Nav.propTypes = {
    menuClick: PropTypes.func
};
export default Nav;
