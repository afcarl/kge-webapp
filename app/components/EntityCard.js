import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Actions

// Custom components

// Material Ui components
import Paper from 'material-ui/Paper';

class EntityCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this._getEntity(props.datasetObject),
            label: this._getLabel(props.datasetObject),
            description: this._getDescription(props.datasetObject),
        };
    }

    componentWillReceiveProps(nextProps) {
        // Treat input props with appropiate language
        this.setState({
            id: this._getEntity(nextProps.datasetObject),
            label: this._getLabel(nextProps.datasetObject),
            description: this._getDescription(nextProps.datasetObject),
        });
    }

    _getEntity = (datasetObject) => {
        if(datasetObject !== undefined) {
            return datasetObject.entity_id;
        }
        else return undefined;
    }

    _getLabel = (datasetObject) => {
        if(datasetObject !== undefined) {
            // TODO: Select language with a state.settings
            return datasetObject.label['en'];
        }
        else return undefined;
    }

    _getDescription = (datasetObject) => {
        if(datasetObject !== undefined) {
            // TODO: Select language with a state.settings
            return datasetObject.description['en'];
        }
        else return undefined;
    }

    render() {
        const style = {
            margin: '1em',
            display: 'flex',
            flexWrap: 'wrap',
            ...this.props.style,
        };
        return (
            <Paper style={style} zDepth={2}>
                <div id={'label'} style={{
                    flexBasis: '50%',
                }}>
                    <span style={{
                        padding: '1em',
                        display: 'block',
                        fontWeight: 'bold',
                    }}>
                        {this.state.label}
                    </span>
                </div>
                <div id={'id'} style={{
                    flexBasis: '50%',
                    textAlign: 'right',
                }}>
                    <span style={{
                        padding: '1em',
                        fontStyle: 'oblique',
                        display: 'block',
                    }}>
                        {this.state.id}
                    </span>
                </div>
                <div id={'description'} style={{
                    flexBasis: '100%',
                }}>
                    <span style={{
                        padding: '0 1em 1em 1em',
                        display: 'block',
                        fontSize: '1em',
                    }}>
                        {this.state.description}
                    </span>
                </div>
            </Paper>
        );
    }
}

EntityCard.propTypes = {
    // External
    datasetObject: PropTypes.any,
};
EntityCard.displayName = 'EntityCard';

export default EntityCard;
