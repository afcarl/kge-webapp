import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { showModalAddAlgorithm, trainDataset } from '../actions';

// Custom components
import AddAlgorithmDialog from './AddAlgorithmDialog';

// Material Ui components
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class TrainDataset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            algorithmId: 0,
        };
    }

    handleAlgorithmIdChange = (event) => {
        this.setState({
            algorithmId: event.target.value,
        });
    }
    onTrainDataset = () => {
        this.props.trainDataset(this.props.datasetId, this.state.algorithmId);
    }
    render() {
        const buttonStyle = {
            margin: 12,
        };
        return (
            <div>
                <div>
                    <h2>Train Dataset</h2>
                    <TextField
                        hintText="AlgorithmId"
                        value={this.state.algorithmId}
                        floatingLabelText="Algorithm Id"
                        onChange={this.handleAlgorithmIdChange}
                    />
                    <RaisedButton label="Train Dataset"
                                  style={buttonStyle}
                                  onTouchTap={this.onTrainDataset} />
                </div>
                <AddAlgorithmDialog active={this.props.showModalAddAlgorithm} closeModal={this.props.hideDialog}/>
                <div>
                    <RaisedButton label="Add Algorithm"
                                  style={buttonStyle}
                                  onTouchTap={this.props.showDialog} />
                </div>
            </div>
        );
    }
}

TrainDataset.propTypes = {
    datasetId: PropTypes.any,
    trainDataset: PropTypes.func,
    showDialog: PropTypes.func,
    hideDialog: PropTypes.func,
    showModalAddAlgorithm: PropTypes.bool,
};
TrainDataset.displayName = 'TrainDataset';

const mapStateToProps = (state) => {
    return {
        showModalAddAlgorithm: state.showModalAddAlgorithm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        trainDataset: (datasetId, algorithmId) => {
            dispatch(trainDataset(datasetId, algorithmId));
        },
        showDialog: () => dispatch(showModalAddAlgorithm(true)),
        hideDialog: () => dispatch(showModalAddAlgorithm(false))
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainDataset);
