import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { apiPostDatasets } from '../actions';

// Components from material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class AddDatasetDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
        };
    }
    _addDataset = () => {
        console.log('Add dataset!!!');
        console.log('Estado', this.state);
        this.props.submitNewDataset(this.state);
        this.props.closeModal();
    }
    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value,
        });
    }
    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value,
        });
    }
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.closeModal}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this._addDataset}
            />,
        ];
        return (
            <Dialog
                title="Add dataset"
                actions={actions}
                modal={false}
                open={this.props.active}
                onRequestClose={this.props.closeModal}
                autoScrollBodyContent={true}
            >
                <TextField
                    hintText="Dataset title"
                    value={this.state.title}
                    floatingLabelText="Dataset title"
                    onChange={this.handleTitleChange}
                />
                <br/>
                <TextField
                    hintText="Dataset description"
                    value={this.state.description}
                    floatingLabelText="Dataset description"
                    onChange={this.handleDescriptionChange}
                />
            </Dialog>
        );
    }
}
AddDatasetDialog.propTypes = {
    closeModal: PropTypes.func,
    active: PropTypes.bool,
    submitNewDataset: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitNewDataset: (dataset) => {
            console.log('New dataset:', dataset);
            dispatch(apiPostDatasets(dataset));
        }
    };
};
// export default AddDatasetDialog;
export default connect(
  null,
  mapDispatchToProps
)(AddDatasetDialog);
