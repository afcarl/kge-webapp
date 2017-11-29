import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { showModalAddAlgorithm, trainDataset, apiGetAlgorithms,
         apiGenerateSearchTree, generateAutocompleteIndex } from '../actions';

// Custom components
import AddAlgorithmDialog from './AddAlgorithmDialog';

// Material Ui components
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class TrainDataset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // algorithmId: 0,
            algorithm: 1,
        };
    }
    componentWillMount() {
        this.props.loadAlgorithms();
    }

    onTrainDataset = () => {
        this.props.trainDataset(this.props.datasetId, this.state.algorithm);
    }
    onGenerateSearchTree = () => {
        console.log("Hoola gen" + this.props.datasetId);
        this.props.generateSearchTree(this.props.datasetId);
    }
    onGenerateAutocompleteIndex = () => {
        console.log("Hoola autoc" + this.props.datasetId);
        this.props.generateAutocompleteIndex(this.props.datasetId);
    }
    handleChange = (event, index, algorithm) => {
        this.setState({algorithm});
    }
    _generateAlgorithmText = (algorithm) => {
        return 'ID: ' + algorithm.id + ' (Embedding: ' + algorithm.embedding_size + ', max epochs: ' + algorithm.max_epochs + ', margin: ' + algorithm.margin + ')';
    }
    render() {
        const buttonStyle = {
            margin: 12,
        };
        return (
            <div>
                <div>
                    <h2>Train Dataset</h2>
                    <SelectField
                        floatingLabelText="Frequency"
                        value={this.state.algorithm}
                        onChange={this.handleChange}
                        autoWidth={true}
                    >
                    {   /* Print all algorithms on MenuItem components */
                        this.props.allAlgorithms.map( algorithm => {
                            if(algorithm !== undefined) {
                                return (
                                <MenuItem value={algorithm.id}
                                          primaryText={this._generateAlgorithmText(algorithm)}
                                          key={algorithm.id}/>
                                  );
                            }
                        })
                    }
                    </SelectField>
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
                <div>
                    <RaisedButton label="Generate Search Tree"
                                   style={buttonStyle}
                                   onTouchTap={this.onGenerateSearchTree} />

                    <RaisedButton label="Generate autoComplete index"
                    style={buttonStyle}
                    onTouchTap={this.onGenerateAutocompleteIndex} />

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
    loadAlgorithms: PropTypes.func,
    generateAutocompleteIndex: PropTypes.func,
    generateSearchTree: PropTypes.func,
    allAlgorithms: PropTypes.any,
};
TrainDataset.displayName = 'TrainDataset';

const mapStateToProps = (state) => {
    return {
        showModalAddAlgorithm: state.showModalAddAlgorithm,
        allAlgorithms: state.allAlgorithms,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        trainDataset: (datasetId, algorithmId) => {
            dispatch(trainDataset(datasetId, algorithmId));
        },
        showDialog: () => dispatch(showModalAddAlgorithm(true)),
        hideDialog: () => dispatch(showModalAddAlgorithm(false)),
        loadAlgorithms: () => dispatch(apiGetAlgorithms()),
        generateSearchTree: (datasetId) => dispatch(apiGenerateSearchTree(datasetId)),
        generateAutocompleteIndex: (datasetId) => dispatch(generateAutocompleteIndex(datasetId))
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainDataset);
