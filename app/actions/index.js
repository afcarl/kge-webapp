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

export function toggleDrawerBar(text) {
    return {
        type: types.TOGGLE_DRAWER_BAR,
        text
    };
}

// Async API calls
export function apiGetDatasets() {
    return {
        type: types.GET_DATASETS,
    };
}
export function apiPostDatasets(dataset) {
    return {
        type: types.POST_DATASET,
        dataset
    };
}
