import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Actions
import { apiDeleteDataset, apiGetDataset } from '../actions';

// Material Ui components
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class Dataset extends Component {

    constructor(props) {
        super(props);
        this.props.reloadDataset(this.props.params.id);
        this.state = {
            editMode: false,
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
        this.setState({editMode: !this.state.editMode});
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

        if(this.props.dataset !== [] && this.props.dataset !== undefined) {
            return (
                <div style={styFlexContainer}>
                    <Paper style={styRightItem} zDepth={1}>
                        'Imagen'
                    </Paper>
                    <Paper style={styLeftItem} zDepth={1}>
                        <h1>{this.props.dataset.name}</h1>
                        {
                            this.state.editMode ?
                                <h2>EDIT:{this.props.dataset.description}</h2>
                            :
                                <h2>FIJO:{this.props.dataset.description}</h2>
                        }

                        <ul>
                            <li>{this.props.dataset.dataset_type}</li>
                            <li>Triples: {this.props.dataset.triples}</li>
                            <li>Entities: {this.props.dataset.entities}</li>
                            <li>Relations {this.props.dataset.relations}</li>
                        </ul>

                        <p>{JSON.stringify(this.props.dataset)}</p>
                        <RaisedButton label="Delete" style={buttonStyle} onTouchTap={this.onDeleteDataset} />
                        <RaisedButton label="Edit" style={buttonStyle} onTouchTap={this.onEdit} />
                    </Paper>
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
    dataset: PropTypes.any
};
Dataset.displayName = 'Dataset';

const mapStateToProps = (state, ownProps) => {
    return {
        dataset: state.allDatasets.filter((dataset) => {
            // Extract from state.allDatasets the selected dataset for this screen
            if(dataset !== undefined &&
               parseInt(dataset.id, 10) === parseInt(ownProps.params.id, 10)) {
                return dataset;
            }
            return undefined;
        })[0]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteDataset: (id) => {
            dispatch(apiDeleteDataset(id));
        },
        reloadDataset: (id) => {
            dispatch(apiGetDataset(id));
        }
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dataset);
