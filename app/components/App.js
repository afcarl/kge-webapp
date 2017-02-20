// import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
// import { footer } from '../styles/footer.scss';
//
// const App = ({ children }) =>
//     <div>
//         <h1>Filter table</h1>
//         { children }
//         <footer className={footer}>
//             <Link to="/">Filterable Table</Link>
//             <Link to="/about">About</Link>
//         </footer>
//     </div>;
//
// App.propTypes = {
//     children: PropTypes.object
// };
//
// export default App;

import React, { PropTypes, Component } from 'react';
// import { connect } from 'react-redux'
// var classnames = require('classnames');
import classnames from 'classnames';
import Nav from './Nav';
import { connect } from 'react-redux';
import { toggleDrawerBar } from './../actions';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import { appContent, expanded } from '../styles/index.scss';
// import { filterableTable } from '../styles/filterableTable.scss';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {open: true}; // explore redux to change state
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        let forceNavDown = {'top': '64px', zIndex: 100};
        return (
            <Paper zDepth={0}>
                <Nav menuClick={this.props.onMenuClick}/>
                <Drawer open={this.props.drawerNav} containerStyle={forceNavDown}>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
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
            console.log('click');
            dispatch(toggleDrawerBar(id));
        }
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
