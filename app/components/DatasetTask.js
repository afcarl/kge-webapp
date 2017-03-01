import React, { PropTypes, Component } from 'react';

// Redux stuff
import { connect } from 'react-redux';
import { getTask } from '../actions';

// material-ui components

class DatasetTask extends Component {
    constructor(props) {
        super(props);
        this.props.reloadTask(props.taskId);
    }

    render() {
        return (
            <div>
                Tasks:<br/>
                {this.props.taskId}
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
    console.log('Status:', state.allTasks[ownProps.taskId]);
    return {
        taskStore: state.allTasks.filter((task) => {
            // Extract from state.allDatasets the selected dataset for this screen
            if(task !== undefined &&
               parseInt(task.id, 10) === parseInt(ownProps.taskId, 10)) {
                return task;
            }
            return undefined;
        })[0],
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
