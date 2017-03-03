import React, { PropTypes, Component } from 'react';

// Redux stuff
import { connect } from 'react-redux';
import { getTask } from '../actions';

// material-ui components

class DatasetTask extends Component {
    constructor(props) {
        super(props);
        console.log('las props son:', props);
        this.props.reloadTask(props.taskId);
        this.state = {
            color: '#0000aa',
            progress: undefined,
            stepsText: undefined,
            taskState: undefined,
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log('Calculate new state with next props', this.props, nextProps);
        const task = nextProps.taskStore;
        const newState = {};
        if (nextProps.taskStore !== undefined) {
            newState.taskState = task.state;
            switch (task.state) {
                case 'STARTED':
                    newState.color = '#ff0';
                    if (nextProps.taskStore.progress !== undefined) {
                        newState.progress = nextProps.taskStore.progress.current / nextProps.taskStore.progress.total;
                        if(nextProps.taskStore.progress.current_steps !== null || nextProps.taskStore.progress.total_steps !== null) {
                            newState.stepsText = nextProps.taskStore.progress.current_steps +  ' of ' + nextProps.taskStore.progress.total_steps;
                        }
                    }
                    break;
                case 'SUCCESS':
                    newState.color = '#0f0';
                    break;
                default:
                    newState.color = '#00f';
                    break;
            }
        }
        this.setState(newState);
    }

    render() {
        const styTask = {
            color: this.state.color,
            textWeight: 800,
        };

        return (
            <div>
                Tasks:<br/>
            <span style={styTask}>⬤</span>&nbsp;{this.props.taskId}&nbsp;-&nbsp;
                {
                    this.state.progress !== undefined ?
                        <span>Progress {Math.round(this.state.progress * 1000) / 10}%</span>
                    :
                        <span>{this.state.taskState}</span>
                }
                &nbsp;
                {this.state.stepsText ?
                    <span>(step {this.state.stepsText})</span>
                    :
                    <span></span>
                }

            </div>
        );
    }
}
DatasetTask.propTypes = {
    taskId: PropTypes.any,
    taskStore: PropTypes.any,
    reloadTask: PropTypes.any,
};

const mapStateToProps = (state, ownProps) => {
    // console.log('MapStateToProps@DatasetTask', state.allTasks[ownProps.taskId]);
    const task = state.allTasks[ownProps.taskId];
    const r = {
        taskStore: task,
    };
    return r;
};

const mapDispatchToProps = (dispatch) => {
    return {
        reloadTask: (id) => {
            dispatch(getTask(id));
        },
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetTask);
