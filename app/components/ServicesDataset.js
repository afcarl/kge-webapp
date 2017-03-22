import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { ServicesApi } from '../api';

// Actions
import { getSuggestions } from '../actions';

// Custom components


// Material Ui components
import AutoComplete from 'material-ui/AutoComplete';

class ServicesDataset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };
        this.api = new ServicesApi('http://valdemoro.dia.fi.upm.es:6789');
    }
    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        // Update the state with suggestion received
        this.setState({
            dataSource: [...nextProps.suggestion],
        });
    }

    handleUpdateInput = (value) => {
        // Call to suggestion API
        this.props.getSuggestion(this.props.datasetId, value);
    }
    suggestionFilter = (searchText, key) => {
        // Filter only when searchText is empty
        return searchText !== '';
    }
    render() {
        return (
            <div>
                <p>Find similar entities</p>
                <AutoComplete
                    hintText="Type anything"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                    filter={this.suggestionFilter}
                />
            </div>
        );
    }
}

ServicesDataset.propTypes = {
    datasetId: PropTypes.number,
    suggestion: PropTypes.array,
    getSuggestion: PropTypes.func,
};
ServicesDataset.displayName = 'ServicesDataset';

const mapStateToProps = (state) => {
    return {
        suggestion: state.suggestion,
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
