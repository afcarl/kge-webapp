import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { ServicesApi } from '../api';

// Actions
import {  } from '../actions';

// Custom components


// Material Ui components
import AutoComplete from 'material-ui/AutoComplete';

class ServicesDataset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            autocompletions: [],
        };
        this.api = new ServicesApi('http://valdemoro.dia.fi.upm.es:6789');
    }
    componentWillMount() {
    }

    handleUpdateInput = (value) => {
        const suggestions = this.api.getSuggestions(this.props.datasetId, value).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            const suggests = [];
            response.forEach((suggestion) => {
                console.log(suggestion.text);
                suggests.push(suggestion.text);
            });
            return suggests;
        });
        // TODO: SetState does not work properly because promise haven't been resolved when it is executed
        console.log("suggestions are:", suggestions);
        this.setState({
            autocompletions: suggestions,
        });
    }

    render() {
        return (
            <div>
                <p>Find similar entities</p>
                <AutoComplete
                    hintText="Type anything"
                    dataSource={this.state.autocompletions}
                    onUpdateInput={this.handleUpdateInput}
                />
            <p>abcd</p> <br/>
            <p>abcd</p> <br/>
            <p>abcd</p> <br/>
            <p>abcd</p> <br/>
            </div>
        );
    }
}

ServicesDataset.propTypes = {
    datasetId: PropTypes.any,
};
ServicesDataset.displayName = 'ServicesDataset';

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesDataset);
