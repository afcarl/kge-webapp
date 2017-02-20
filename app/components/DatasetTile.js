import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
// material-ui components
// import { TextField } from 'material-ui/';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class DatasetTile extends Component {
    _getName() {
        return this.props.name;
    }
    _getDescription() {
        if(!this.props.description) {
            return('No description available');
        }
        return(this.props.description);
    }
    _getId() {
        return this.props.id;
    }
    _getLink() {
        return '/dataset/' + this._getId();
    }
    render() {
        return (
            <Link to={this._getLink()}>
                <GridTile title={ this._getName() }
                          subtitle={ this._getDescription() }
                          actionIcon={< IconButton > <StarBorder color="white"/> < /IconButton>}>
                    {/* <img src="http://www.material-ui.com/" alt=""/> */}
                </GridTile>
            </Link>
        );
    }
}
DatasetTile.propTypes = {
    closeModal: PropTypes.func,
    description: PropTypes.str,
    name: PropTypes.str,
    id: PropTypes.int,
};
export default DatasetTile;
