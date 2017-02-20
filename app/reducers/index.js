import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

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
        case 'GET_DATASETS_RECEIVED':
            return action.datasets;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    filter,
    drawerNav,
    allDatasets,
    showModalAddDataset,
    routing
});

export default rootReducer;
