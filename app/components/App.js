import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

// Visual components
import Nav from './Nav';
import DrawerNav from './DrawerNav';

// Material UI Components
import Paper from 'material-ui/Paper';

import { toggleDrawerBar } from './../actions';
import { appContent, expanded } from '../styles/index.scss';

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper zDepth={0}>
                <Nav menuClick={this.props.onMenuClick}/>
                <DrawerNav isOpen={this.props.drawerNav}/>
                <main
                    className={classnames(appContent, {[expanded]: this.props.drawerNav})}
                >
                    {this.props.children}
                </main>
            </Paper>
        );
    }
}

Layout.displayName = 'Layout';
Layout.propTypes = {
    onMenuClick: PropTypes.func,
    drawerNav: PropTypes.bool,
    children: PropTypes.element
};
// This component manages the visible layout (Hides sidebar)

const mapStateToProps = (state) => {
    return {
        drawerNav: state.drawerNav
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMenuClick: (id) => {
            dispatch(toggleDrawerBar(id));
        }
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
