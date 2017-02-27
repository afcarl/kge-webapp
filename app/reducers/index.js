import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

function datasetToList(initialDatasetList, newDatasetList) {
    // console.log('tolist', newDatasetList, initialDatasetList);
    newDatasetList.forEach((dataset) => {
        // console.log(initialDatasetList);
        initialDatasetList[dataset.id] = dataset;
    });
    // console.log('last', initialDatasetList);
    return initialDatasetList;
}

const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;
        default:
            return state;
    }
};

// react-redux generates this VisibleLayout component
function drawerNav(state = types.TOGGLE_DRAWER_BAR, action) {
    switch (action.type) {
        case types.TOGGLE_DRAWER_BAR:
            return !state;
        default:
            return state;
    }
}

function showModalAddDataset(state = types.SHOW_MODAL_ADD_DATASET, action) {
    // console.log("MODALDATASET!!!")
    // console.log(action, state)
    switch (action.type) {
        case types.SHOW_MODAL_ADD_DATASET:
            return action.isOpen;
        default:
            return state;
    }
}

function allDatasets(state = [], action) {
    switch (action.type) {
        case types.GET_DATASETS_RECEIVED:
            return datasetToList([...state], action.datasets);
        case types.GET_DATASET_SUCCESS:
            return datasetToList([...state], [action.dataset]);
        case types.DELETE_DATASET_SUCCESS:
            const newState = [...state];
            newState[action.id] = undefined;
            return newState;
        default:
            return state;
    }
}
function datasetOnUpdate(state = [], action) {
    const datasetStatus = [...state];
    switch (action.type) {
        case types.PUT_DATASET:
            datasetStatus[action.dataset.id] = false;
            return datasetStatus;
        case types.GET_DATASET:
            datasetStatus[action.id] = false;
            return datasetStatus;
        case types.GET_DATASET_SUCCESS:
            datasetStatus[action.dataset.id] = true;
            return datasetStatus;
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    filter,
    drawerNav,
    allDatasets,
    showModalAddDataset,
    datasetOnUpdate,
    routing
});

export default rootReducer;
