import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { getSuggestions, getSimilarEntities } from '../actions';

// Custom components
import EntityCompleter from './EntityCompleter';
import EntityCard from './EntityCard';

// Material Ui components
import RaisedButton from 'material-ui/RaisedButton';

class ServicesDataset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entity: undefined,
            objectEntity: undefined,
        };
    }
    componentWillMount() {
    }

    readEntity = (entity, objectEntity, index) => {
        console.log('Received ', entity, objectEntity, index);
        this.setState({
            entity: entity.valueKey,
            objectEntity,
        });
    }
    onFindDataset = () => {
        // Check if Entity completer has been selected
        console.log('is initialized:', this.state.entity);
        this.props.getSimilarEntities(this.props.datasetId, this.state.entity);
    }
    render() {
        const buttonStyle = {
            margin: 12,
        };
        return (
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                <div style={{
                    flexBasis: '50%',
                }}>
                    <p>Select an entity and find similar ones</p>
                    <EntityCompleter
                        datasetId={this.props.datasetId}
                        onUserChoose={this.readEntity}
                        />
                    <p>&nbsp;</p><br/>
                    <RaisedButton label="Find similar entities"
                                  style={buttonStyle}
                                  onTouchTap={this.onFindDataset}
                    />
                </div>
                <div style={{
                    flexBasis: '50%',
                }}>
                    <EntityCard datasetObject={this.state.objectEntity}/>
                </div>
                <div style={{
                    flexBasis: '100%'
                }}>
                    {
                        this.props.allEntities.map(entity =>
                             <EntityCard { ...entity } key={ entity.id }/>
                        )
                    }
                </div>
            </div>
        );
    }
}

ServicesDataset.propTypes = {
    datasetId: PropTypes.number,
    getSimilarEntities: PropTypes.func,
    getSuggestion: PropTypes.func,
};
ServicesDataset.displayName = 'ServicesDataset';

const mapStateToProps = (state) => {
    return {
        fullSuggestion: state.suggestion,
        allEntities: [],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSuggestion: (datasetId, text) => dispatch(getSuggestions(datasetId, text)),
        getSimilarEntities: (datasetId, entity) => dispatch(getSimilarEntities(datasetId, entity)),
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesDataset);
