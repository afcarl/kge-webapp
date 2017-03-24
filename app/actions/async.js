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
export function taskErrorReceived(response) {
    return {
        type: types.GET_TASK_ERROR,
        response
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

export function algorithmReceived(algorithm) {
    return {
        type: types.GET_ALGORITHM_RECEIVED,
        algorithm
    };
}

export function algorithmsReceived(algorithms) {
    return {
        type: types.GET_ALGORITHMS_RECEIVED,
        algorithms
    };
}

export function suggestionsReceived(datasetId, suggestions) {
    return {
        type: types.GET_SUGGESTIONS_RECEIVED,
        datasetId,
        suggestions
    };
}

export function similarEntitiesReceived(datasetId, entity, similarEntities) {
    return {
        type: types.GET_SIMILARENTITIES_RECEIVED,
        datasetId,
        entity,
        similarEntities,
    };

}
