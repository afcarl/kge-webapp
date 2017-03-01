import * as types from './types';
// For actions which appears on dataService middleware
export function datasetsReceived(datasets) {
    return {
        type: types.GET_DATASETS_RECEIVED,
        datasets
    };
}

export function taskReceived(task) {
    return {
        type: types.GET_TASK_RECEIVED,
        task
    };
}

export function datasetReceived(dataset) {
    return {
        type: types.GET_DATASET_SUCCESS,
        dataset
    };
}

export function datasetDeleteSuccess(id) {
    return {
        type: types.DELETE_DATASET_SUCCESS,
        id
    };
}
