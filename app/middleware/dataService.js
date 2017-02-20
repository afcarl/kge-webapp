import DatasetApi from '../api.js';
import * as types from '../actions/types';

const dataService = store => next => action => {
    const api = new DatasetApi('http://valdemoro.dia.fi.upm.es:6789');
    /*  Pass all actions through by default */
    next(action);
    // console.log("middleware", action)
    switch (action.type) {
        case types.GET_DATASETS:
            api.getAll().then((response) => {
                return response.json();
            }).then((datasets) => {
                // console.log("Datasets recibidos", datasets);
                return next({
                    type: types.GET_DATASETS_RECEIVED,
                    datasets
                });
            });
            break;
        case types.POST_DATASET:
            // TODO: Implement POST API caller
            console.log('API POST');
            break;
        default:
            break;
    }
};

export default dataService;
