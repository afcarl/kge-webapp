import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

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
                        secondaryText={suggestion.entity.entity_id}
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
    userChoose = (entity, id) => {
        const selectedEntity = this.props.fullSuggestion.filter((ent) => {
            return ent.entity.entity === entity.valueKey;
        })[0];
        console.log('found entity is:', selectedEntity);
        this.props.onUserChoose(entity, selectedEntity.entity, id);
    }

    render() {
        return (
            <AutoComplete
                hintText="Choose an entity"
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
                filter={this.suggestionFilter}
                onNewRequest={this.userChoose}
                fullWidth={true}
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
