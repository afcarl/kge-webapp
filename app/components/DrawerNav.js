import React, { PropTypes, Component } from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class DrawerNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let forceNavDown = {'top': '64px', zIndex: 100};
        return (
            <Drawer open={this.props.isOpen} containerStyle={forceNavDown}>
                <MenuItem>Datasets</MenuItem>
                <MenuItem>Train Algorithms</MenuItem>
                <MenuItem>Tasks</MenuItem>
            </Drawer>
        );
    }
}

DrawerNav.displayName = 'DrawerNav';
DrawerNav.propTypes = {
    isOpen: PropTypes.bool,
};

export default DrawerNav;
