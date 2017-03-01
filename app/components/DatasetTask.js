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
            color: '#000',
            progress: '',
        };
    }

    componentWillReceiveProps() {
        console.log('Tarea:', this.props);
    }

    render() {
        const styTask = {
            color: this.props.color,
            textWeight: 800,
        };

        return (
            <div>
                Tasks:<br/>
            <span style={styTask}>⬤</span>
                {this.props.taskId} &nbsp; - Progreso: {Math.round(this.props.progress * 1000) / 10}%
            </div>
        );
    }
}
DatasetTask.propTypes = {
    taskId: PropTypes.any,
    taskStore: PropTypes.any,
    reloadTask: PropTypes.any,
    color: PropTypes.any,
    progress: PropTypes.any,
};

const mapStateToProps = (state, ownProps) => {
    console.log('Status:', state.allTasks[ownProps.taskId]);
    const task = state.allTasks[ownProps.taskId];
    let color = '#000';
    let progress = '0';
    if (task !== undefined) {
        switch (task.state) {
            case 'STARTED':
                color = '#ff0';
                break;
            default:
                color = '#00f';
                break;
        }
        progress = task.progress.current / task.progress.total;
    }
    return {
        taskStore: task,
        color,
        progress,
    };
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
