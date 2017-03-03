import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { apiPostAlgorithm } from '../actions';

// Components from material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class AddAlgorithmDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            embeddingSize: 0,
            margin: 0,
            maxEpochs: 0,
        };
    }
    _addAlgorithm = () => {
        console.log('Add Algorithm!!!');
        console.log('Estado', this.state);
        this.props.submitNewAlgorithm(this.state);
        this.props.closeModal();
    }
    handleEmbeddingChange = (event) => {
        this.setState({
            embeddingSize: event.target.value,
        });
    }
    handleMarginChange = (event) => {
        this.setState({
            margin: event.target.value,
        });
    }
    handleMaxEpochsChange = (event) => {
        this.setState({
            maxEpochs: event.target.value,
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
                onTouchTap={this._addAlgorithm}
            />,
        ];
        return (
            <Dialog
                title="Add Algorithm"
                actions={actions}
                modal={false}
                open={this.props.active}
                onRequestClose={this.props.closeModal}
                autoScrollBodyContent={true}
                >
                <TextField
                    hintText="Embedding vector size"
                    value={this.state.title}
                    floatingLabelText="Embedding vector size"
                    onChange={this.handleEmbeddingChange}
                    />
                <br />
                <TextField
                    hintText="Margin"
                    value={this.state.title}
                    floatingLabelText="Margin"
                    onChange={this.handleMarginChange}
                    />
                <br/>
                <TextField
                    hintText="Max Epochs"
                    value={this.state.description}
                    floatingLabelText="Max Epochs"
                    onChange={this.handleMaxEpochsChange}
                    />
            </Dialog>
        );
    }
}
AddAlgorithmDialog.propTypes = {
    closeModal: PropTypes.func,
    active: PropTypes.bool,
    submitNewAlgorithm: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitNewAlgorithm: (algorithm) => {
            console.log('New algorithm:', algorithm);
            dispatch(apiPostAlgorithm(algorithm));
        }
    };
};
// export default AddAlgorithmDialog;
export default connect(
  null,
  mapDispatchToProps
)(AddAlgorithmDialog);
