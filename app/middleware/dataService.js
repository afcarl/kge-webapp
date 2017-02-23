import DatasetApi from '../api.js';
import * as types from '../actions/types';
import { apiGetDatasets, apiGetDataset } from '../actions';
import { datasetsReceived, datasetReceived, datasetDeleteSuccess } from '../actions/async';

const dataService = store => next => action => {
    const api = new DatasetApi('http://valdemoro.dia.fi.upm.es:6789');
    /*  Pass all actions through by default */
    next(action);
    // console.log("middleware", action)
    switch (action.type) {
        case types.GET_DATASETS:
            console.log('GET DATASETS...');
            api.getAll().then((response) => {
                return response.json();
            }).then((datasets) => {
                // console.log("Datasets recibidos", datasets);
                return next(datasetsReceived(
                    // Convert dataset.dataset into dataset
                    datasets.map((dataset)=>{return dataset.dataset;})
                ));
            });
            break;

        case types.GET_DATASET:
            // console.log('Get a single Dataset and update on state');
            api.getDataset(action.id).then((response) => {
                return response.json();
            }).then((dataset) => {
                return next(datasetReceived(dataset.dataset));
            });
            break;

        case types.POST_DATASET:
            api.postDataset(action.dataset.title, action.dataset.description).then((response) => {
                return response.json();
            }).then((dataset) => {
                return store.dispatch(apiGetDataset(dataset.dataset.id));
            });
            break;

        case types.DELETE_DATASET:
            // console.log('Delete this dataset:', action);
            api.deleteDataset(action.id).then((response) => {
                return next(datasetDeleteSuccess(action.id));
            });
            break;

        default:
            break;
    }
};

export default dataService;
