import React, { PropTypes, Component } from 'react';
import DatasetApi from './../api.js';
import Paper from 'material-ui/Paper';

// import RaisedButton from 'material-ui/RaisedButton';

class Dataset extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.api = new DatasetApi('http://valdemoro.dia.fi.upm.es:6789');
    }
    componentWillMount() {
        console.log('principio');
        this.api.getDataset(this.props.params.id).then((response) => {
            console.log('primer');
            console.log(response);
            return response.json();
        }).then((remoteDataset) => {
            console.log('segundo');
            console.log(remoteDataset.dataset);
            this.setState({dataset: remoteDataset.dataset});
        }).catch((error) =>
            console.log('error found: ' + error)
        );
        console.log('fin');
    }

    render() {
        const style = {
        //   height: '95%',
        //   width: '46%',
            margin: '1em 1%',
        //   textAlign: 'center',
            display: 'inline-block',
        //   flex: 'flex-grow',
        //   flexGrow: 1
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

        if(this.state && this.state.dataset) {
            return (
                <div style={styFlexContainer}>
                    <Paper style={styRightItem} zDepth={1}>
                        'Imagen'
                    </Paper>
                    <Paper style={styLeftItem} zDepth={1}>
                        <h1>{this.state.dataset.name}</h1>
                        <h2>{this.state.dataset.description}</h2>

                        <ul>
                            <li>{this.state.dataset.dataset_type}</li>
                            <li>Triples: {this.state.dataset.triples}</li>
                            <li>Entities: {this.state.dataset.entities}</li>
                            <li>Relations {this.state.dataset.relations}</li>
                        </ul>

                        <p>{JSON.stringify(this.state.dataset)}</p>
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
};
Dataset.displayName = 'Dataset';

export default Dataset;
