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
            id: undefined,
            label: undefined,
            description: undefined,
        };

    }

    componentWillReceiveProps(nextProps) {
        // Treat input props with appropiate language
        console.log('cwrp-ec', nextProps.datasetObject);
        if(nextProps.datasetObject !== undefined) {
            this.setState({
                id: nextProps.datasetObject.entity,
                label: nextProps.datasetObject.label['en'],
                description: nextProps.datasetObject.description['en'],
            });
        }
    }

    render() {
        const style = {
            // height: 100,
            // width: 100,
            margin: '1em',
            // textAlign: 'center',
            display: 'flex',
            flexWrap: 'wrap',
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
