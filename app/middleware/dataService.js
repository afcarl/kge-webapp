import DatasetApi from '../api.js';
import * as types from '../actions/types';
import { apiGetDatasets } from '../actions';

const dataService = () => next => action => {
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
                return next({
                    type: types.GET_DATASETS_RECEIVED,
                    datasets: datasets.map((dataset)=>{return dataset.dataset;})
                });
            });
            break;

        case types.GET_DATASET:
            // console.log('Get a single Dataset and update on state');
            api.getDataset(action.id).then((response) => {
                return response.json();
            }).then((dataset) => {
                // console.log('Dataset', dataset);
                return next({
                    type: types.GET_DATASET_RECEIVED,
                    dataset: dataset.dataset
                });
            });
            break;

        case types.POST_DATASET:
            console.log('API', action);
            api.postDataset(action.dataset.title, action.dataset.description).then((response) => {
                console.log('Respuesta', response);
                return response.json();
            }).then((dataset) => {
                console.log('El dataset:', dataset);
                return next({
                    type: 'ADD_DATASET',
                });
            });
            break;

        case types.DELETE_DATASET:
            console.log('APIDELETE:', action);
            api.deleteDataset(action.id).then((response) => {
                console.log('respuesta delete:', response);
                return next(apiGetDatasets());
            });
            break;

        default:
            break;
    }
};

export default dataService;
