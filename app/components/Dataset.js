import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Local components
import GenerateTriples from './GenerateTriples';
import TrainDataset from './TrainDataset';
import ServicesDataset from './ServicesDataset';
import DatasetTask from './DatasetTask';

// Actions
import { apiDeleteDataset, apiGetDataset, apiPutDataset } from '../actions';

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
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';

import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

const RUNNING_TASK_MASK = 0b0001;
const TRAINED_MASK = 0b0010;
const INDEXED_MASK = 0b0100;
const SEARCHINDEXED_MASK = 0b1000;

class Dataset extends Component {
    constructor(props) {
        super(props);
        this.props.reloadDataset(this.props.params.id, true);
        this.state = {
            editMode: false,
            description: '',
            deleteDialogOpen: false,
        };
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
    isTrained = (status = this.props.dataset.status) => {
        return (status & TRAINED_MASK) !== 0;
    }
    isIndexed = (status = this.props.dataset.status) => {
        return (status & INDEXED_MASK) !== 0;
    }
    isSearchIndexed = (status = this.props.dataset.status) => {
        return (status & SEARCHINDEXED_MASK) !== 0;
    }
    isRunningTask = (status = this.props.dataset.status) => {
        return (status & RUNNING_TASK_MASK) !== 0;
    }

    render() {
        const style = {
            margin: '1em 1%',
            display: 'inline-block',
        };

        const styRightItem = {
            ...style,
            width: '55%'
        };
        const styLeftItem = {
            ...style,
            width: '40%'
        };
        const styBottomItem = {
            ...style,
            width: '100%',
        };
        const styFlexContainer = {
            padding: '0',
            margin: '0',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
        };
        const buttonStyle = {
            margin: 12,
        };
        const circularProgressStyle = {
            padding: '0em 1em',
        };
        const tabPadding = {
            padding: '1em',
        };
        const deleteActions = [
            <FlatButton
                label="CancVel"
                primary={true}
                onTouchTap={this.handleDeleteDialogClose}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onTouchTap={this.handleDeleteDialogDelete}
            />,
        ];

        const data = [
            {
                type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
                x: [1, 2, 3],     // more about "x": #scatter-x
                y: [6, 2, 3],     // #scatter-y
                marker: {         // marker is an object, valid marker keys: #scatter-marker
                    color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
                }
            },
            {
                type: 'bar',      // all "bar" chart attributes: #bar
                x: [1, 2, 3],     // more about "x": #bar-x
                y: [6, 2, 3],     // #bar-y
                name: 'bar chart example' // #bar-name
            }
        ];
        const layout = {                     // all "layout" attributes: #layout
            title: 'simple example',  // more about "layout.title": #layout-title
            xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
                title: 'time'         // more about "layout.xaxis.title": #layout-xaxis-title
            },
            annotations: [            // all "annotation" attributes: #layout-annotations
                {
                    text: 'simple annotation',    // #layout-annotations-text
                    x: 0,                         // #layout-annotations-x
                    xref: 'paper',                // #layout-annotations-xref
                    y: 0,                         // #layout-annotations-y
                    yref: 'paper'                 // #layout-annotations-yref
                }
            ]
        };
        const config = {
            showLink: false,
            displayModeBar: true
        };


        if(this.props.dataset !== [] && this.props.dataset !== undefined) {
            return (
            <div>
                <div style={styFlexContainer}>
                    {/* <Paper style={styRightItem} zDepth={1}>
                              <PlotlyComponent className="whatever" data={data} layout={layout} config={config}/>
                    </Paper> */}
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
                        <DatasetTask taskId={this.props.dataset.task}/>
                        <RaisedButton label="Delete" style={buttonStyle} onTouchTap={this.handleDeleteDialogOpen} />

                        <Divider/>
                        <div style={{
                            flexBasis: '100%'
                        }}>
                            <h1>Dataset Status</h1>
                            <ul>
                                { this.isRunningTask() ?
                                    <li>Running Task</li> : <null/>
                                }
                                { this.isSearchIndexed() ?
                                    <li>Entity Autocomplete Search</li> : <null/>
                                }
                                { this.isIndexed() ?
                                    <li>Entity similarity</li> : <null/>
                                }
                                { this.isTrained() ?
                                    <li>Trained</li> : <null/>
                                }
                            </ul>
                        </div>
                    </Paper>
                    <Paper style={styRightItem}>
                        <Tabs>
                            <Tab label="Insert triples">
                                <div style={tabPadding}>
                                    <GenerateTriples datasetId={this.props.dataset.id}/>
                                </div>
                            </Tab>
                            <Tab label="Train dataset" >
                                <div style={tabPadding}>
                                    <TrainDataset datasetId={this.props.dataset.id}/>
                                </div>
                            </Tab>
                            <Tab label="Dataset services" >
                                <div style={tabPadding}>
                                    <ServicesDataset datasetId={this.props.dataset.id}/>
                                </div>
                            </Tab>
                          </Tabs>
                    </Paper>
                    {/* <Paper style={styBottomItem}>
                        <Tabs>
                            <Tab label="Insert triples">
                                <div style={tabPadding}>
                                    <GenerateTriples datasetId={this.props.dataset.id}/>
                                </div>
                            </Tab>
                            <Tab label="Train dataset" >
                                <div style={tabPadding}>
                                    <TrainDataset datasetId={this.props.dataset.id}/>
                                </div>
                            </Tab>
                            <Tab label="Dataset services" >
                                <div style={tabPadding}>
                                    <ServicesDataset datasetId={this.props.dataset.id}/>
                                </div>
                            </Tab>
                          </Tabs>
                    </Paper> */}
                </div>
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
        reloadDataset: (id, cache) => {
            dispatch(apiGetDataset(id, cache));
        },
        updateDataset: (dataset) => {
            dispatch(apiPutDataset(dataset));
        },
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dataset);
