import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Actions
import { apiDeleteDataset, apiGetDataset, apiPutDataset, generateTriples } from '../actions';

// Material Ui components
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import EditMode from 'material-ui/svg-icons/editor/mode-edit';
import ActionDone from 'material-ui/svg-icons/action/done';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class Dataset extends Component {

    constructor(props) {
        super(props);
        this.props.reloadDataset(this.props.params.id);
        this.state = {
            editMode: false,
            description: '',
            deleteDialogOpen: false,
            graphPattern: '',
            levels: 0,
        };
    }
    componentWillMount() {

    }

    onDeleteDataset = () => {
        console.log('Delete Dataset');
        this.props.deleteDataset(this.props.params.id);
        browserHistory.push('/');
    }
    onEdit = () => {
        this.setState({
            editMode: !this.state.editMode,
            description: this.props.dataset.description,
        });
    }
    onDone = () => {
        console.log('Update dataset description');
        this.props.updateDataset({
            id: this.props.params.id,
            description: this.state.description,
        });
        this.setState({
            editMode: false,
        });
    }
    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value,
        });
    }
    handleDeleteDialogOpen = () => {
        this.setState({deleteDialogOpen: true});
    }
    handleDeleteDialogClose = () => {
        this.setState({deleteDialogOpen: false});
    }
    handleDeleteDialogDelete = () => {
        this.handleDeleteDialogClose();
        this.onDeleteDataset();
    }

    handleGraphPatternChange = (event)  => {
        this.setState({
            graphPattern: event.target.value,
        });
    }
    handleLevelsChange = (event) => {
        this.setState({
            levels: event.target.value,
        });
    }
    onGenerateTriples = () => {
        this.props.generateTriples(this.props.params.id, this.state.graphPattern, this.state.levels);
    }
    render() {
        const style = {
            margin: '1em 1%',
            display: 'inline-block',
        };

        const styRightItem = {
            ...style,
            width: '30%'
        };
        const styLeftItem = {
            ...style,
            width: '60%'
        };
        const styFlexContainer = {
            padding: '0',
            margin: '0',
            display: 'flex',
            justifyContent: 'space-around'
        };
        const buttonStyle = {
            margin: 12,
        };
        const circularProgressStyle = {
            padding: '0em 1em',
        };
        const deleteActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleDeleteDialogClose}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onTouchTap={this.handleDeleteDialogDelete}
            />,
        ];
        if(this.props.dataset !== [] && this.props.dataset !== undefined) {
            return (
            <div>
                <div style={styFlexContainer}>
                    <Paper style={styRightItem} zDepth={1}>
                        'Imagen'
                    </Paper>
                    <Paper style={styLeftItem} zDepth={1}>

                        <h1>
                            {this.props.dataset.name}
                            {this.props.datasetState === false ?
                            <span><CircularProgress thickness={3}
                                style={circularProgressStyle}/></span>
                            : <span></span>}
                        </h1>
                        {
                            this.state.editMode ?
                                <div>
                                <TextField
                                    hintText="Dataset description"
                                    value={this.state.description}
                                    floatingLabelText="Dataset description"
                                    onChange={this.handleDescriptionChange}
                                />
                                <IconButton tooltip="Done" onTouchTap={this.onDone}>
                                    <ActionDone />
                                </IconButton>
                                </div>
                            :
                                <h2>
                                    {this.props.dataset.description}
                                    <IconButton tooltip="Edit" onTouchTap={this.onEdit}>
                                        <EditMode />
                                    </IconButton>
                                </h2>
                        }

                        <ul>
                            <li>{this.props.dataset.dataset_type}</li>
                            <li>Triples: {this.props.dataset.triples}</li>
                            <li>Entities: {this.props.dataset.entities}</li>
                            <li>Relations {this.props.dataset.relations}</li>
                        </ul>
                        <p>Dataset State: {this.datasetState}</p>
                        <p>{JSON.stringify(this.props.dataset)}</p>
                        <RaisedButton label="Delete" style={buttonStyle} onTouchTap={this.handleDeleteDialogOpen} />
                        <RaisedButton label="Edit" style={buttonStyle} onTouchTap={this.onEdit} />
                    </Paper>
                </div>
                <Paper zDepth={1}>
                    <TextField
                        hintText="Graph Pattern"
                        value={this.state.graphPattern}
                        floatingLabelText="Graph Pattern"
                        onChange={this.handleGraphPatternChange}
                    />
                    <TextField
                        hintText="Max exploration levels"
                        value={this.state.levels}
                        floatingLabelText="Max exploration levels"
                        onChange={this.handleLevelsChange}
                    />
                <RaisedButton label="Generate Triples" style={buttonStyle} onTouchTap={this.onGenerateTriples} />
                </Paper>

                <Dialog
                  actions={deleteActions}
                  modal={false}
                  open={this.state.deleteDialogOpen}
                  onRequestClose={this.handleDeleteDialogClose}
                >
                  <p>Do you really want to delete <b>{this.props.dataset.name}</b> dataset?</p>
                </Dialog>
            </div>
            );
        }
        return (
            <div>
                <h1>Dataset {this.props.params.id}</h1>
                <p>Cargando...</p>
            </div>
        );
    }
}

Dataset.propTypes = {
    params: PropTypes.object,
    deleteDataset: PropTypes.func,
    reloadDataset: PropTypes.func,
    updateDataset: PropTypes.func,
    generateTriples: PropTypes.func,
    datasetState: PropTypes.any,
    dataset: PropTypes.any
};
Dataset.displayName = 'Dataset';

const mapStateToProps = (state, ownProps) => {
    console.log('Status:', state.datasetOnUpdate[ownProps.params.id]);
    return {
        dataset: state.allDatasets.filter((dataset) => {
            // Extract from state.allDatasets the selected dataset for this screen
            if(dataset !== undefined &&
               parseInt(dataset.id, 10) === parseInt(ownProps.params.id, 10)) {
                return dataset;
            }
            return undefined;
        })[0],
        datasetState: state.datasetOnUpdate[ownProps.params.id],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteDataset: (id) => {
            dispatch(apiDeleteDataset(id));
        },
        reloadDataset: (id) => {
            dispatch(apiGetDataset(id));
        },
        updateDataset: (dataset) => {
            dispatch(apiPutDataset(dataset));
        },
        generateTriples: (datasetId, graphPattern, maxLevels) => {
            dispatch(generateTriples(datasetId, graphPattern, maxLevels));
        }
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dataset);
