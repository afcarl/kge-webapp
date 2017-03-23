import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { getSuggestions } from '../actions';

// Custom components
import EntityCompleter from './EntityCompleter';

// Material Ui components

class ServicesDataset extends Component {

    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }

    readEntity = (entity, index) => {
        console.log('Received ', entity);
    }
    render() {
        return (
            <div>
                <p>Choose an entity</p>
                <EntityCompleter
                    datasetId={this.props.datasetId}
                    onUserChoose={this.readEntity}
                    />
                <p>&nbsp;</p><br/>
            </div>
        );
    }
}

ServicesDataset.propTypes = {
    datasetId: PropTypes.number
};
ServicesDataset.displayName = 'ServicesDataset';

const mapStateToProps = (state) => {
    return {
        fullSuggestion: state.suggestion,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSuggestion: (datasetId, text) => dispatch(getSuggestions(datasetId, text))
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesDataset);
