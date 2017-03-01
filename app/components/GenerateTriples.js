import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { generateTriples } from '../actions';

// Material Ui components
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class GenerateTriples extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graphPattern: '',
            levels: 0,
        };
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
        this.props.generateTriples(this.props.datasetId, this.state.graphPattern, this.state.levels);
    }
    render() {
        const buttonStyle = {
            margin: 12,
        };
        return (
            <div>
                <h2>Generate triples from graph pattern</h2>
                <TextField
                    multiLine={true}
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
                <RaisedButton label="Generate Triples"
                              style={buttonStyle}
                              onTouchTap={this.onGenerateTriples} />
            </div>
        );
    }
}

GenerateTriples.propTypes = {
    datasetId: PropTypes.any,
    generateTriples: PropTypes.func,
};
GenerateTriples.displayName = 'GenerateTriples';

const mapDispatchToProps = (dispatch) => {
    return {
        generateTriples: (datasetId, graphPattern, maxLevels) => {
            dispatch(generateTriples(datasetId, graphPattern, maxLevels));
        }
    };
};

export default connect(
  null,
  mapDispatchToProps
)(GenerateTriples);
