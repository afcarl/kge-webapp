import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { ServicesApi } from '../api';

// Actions
import { getSuggestions } from '../actions';

// Custom components


// Material Ui components
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

class EntityCompleter extends Component {

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
        const allSuggestions = [];
        nextProps.fullSuggestion.forEach((suggestion) => {
            allSuggestions.push({
                text: suggestion.text,
                valueKey: suggestion.entity.entity,
                value: (
                    <MenuItem
                        primaryText={suggestion.text}
                        secondaryText={suggestion.entity.entity}
                    />
                ),
            });
        });
        this.setState({
            dataSource: allSuggestions,
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
            <AutoComplete
                hintText="Type anything"
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
                filter={this.suggestionFilter}
                onNewRequest={this.props.onUserChoose}
            />
        );
    }
}

EntityCompleter.propTypes = {
    // External
    datasetId: PropTypes.number,
    onUserChoose: PropTypes.func,
    // Internal
    fullSuggestion: PropTypes.array,
    getSuggestion: PropTypes.func,
};
EntityCompleter.displayName = 'EntityCompleter';

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
)(EntityCompleter);
