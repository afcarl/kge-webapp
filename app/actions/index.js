import * as types from './types';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function showModalAddDataset(text) {
    return {
        type: types.SHOW_MODAL_ADD_DATASET,
        isOpen: text
    };
}

export function showModalAddAlgorithm(state) {
    return {
        type: types.SHOW_MODAL_ADD_ALGORITHM,
        isOpen: state
    };
}

export function toggleDrawerBar(text) {
    return {
        type: types.TOGGLE_DRAWER_BAR,
        text
    };
}

// Async API calls
export function apiGetDatasets() {
    // Get all datasets
    return {
        type: types.GET_DATASETS,
    };
}
export function apiGetDataset(id, cache = true) {
    // Get Only the dataset selected
    return {
        type: types.GET_DATASET,
        id,
        cache
    };
}
export function apiPostDatasets(dataset) {
    // Post a new dataset
    return {
        type: types.POST_DATASET,
        dataset
    };
}
export function apiPutDataset(dataset) {
    // Edit (Put) an existing Dataset
    return {
        type: types.PUT_DATASET,
        dataset
    };
}
export function apiDeleteDataset(id) {
    // Delete a dataset
    return {
        type: types.DELETE_DATASET,
        id
    };
}
export function apiGetAlgorithm(id) {
    return {
        type: types.GET_ALGORITHM,
        id
    };
}
export function apiPostAlgorithm(algorithm) {
    return {
        type: types.POST_ALGORITHM,
        algorithm
    };
}

export function getTask(id) {
    return {
        type: types.GET_TASK,
        id
    };
}
export function generateTriples(datasetId, graphPattern, maxLevels) {
    return {
        type: types.GENERATE_TRIPLES,
        datasetId,
        graphPattern,
        maxLevels
    };
}
export function trainDataset(datasetId, algorithmId) {
    return {
        type: types.TRAIN_DATASET,
        datasetId,
        algorithmId
    };
}
