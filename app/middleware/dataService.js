import { DatasetApi, AlgorithmApi, ServicesApi } from '../api';
import TasksApi from '../TasksApi';
import * as types from '../actions/types';
import { apiGetDataset, apiGetAlgorithm } from '../actions';
import { datasetsReceived, datasetReceived, datasetDeleteSuccess,
         taskReceived, taskErrorReceived,
         algorithmReceived, algorithmsReceived,
         suggestionsReceived, similarEntitiesReceived,
       } from '../actions/async';

const dataService = store => next => action => {
    const apiRoute = store.getState().config.apiRoute;
    const api = new DatasetApi(apiRoute);
    const tasksApi = new TasksApi(apiRoute);
    const servicesApi = new ServicesApi(apiRoute);
    const algorithmApi = new AlgorithmApi(apiRoute);

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
            api.getDataset(action.id, action.cache).then((response) => {
                return response.json();
            }).then((dataset) => {
                return next(datasetReceived(dataset.dataset));
            });
            break;
        case types.GET_ALGORITHM:
            algorithmApi.getAlgorithm(action.id).then((response) => {
                return response.json();
            }).then((algorithm) => {
                return next(algorithmReceived(algorithm));
            });
            break;

        case types.GET_ALGORITHMS:
            algorithmApi.getAlgorithms().then((response) => {
                return response.json();
            }).then((algorithms) => {
                return next(algorithmsReceived(algorithms));
            });
            break;

        case types.POST_DATASET:
            api.postDataset(action.dataset.title, action.dataset.description).then((response) => {
                return response.json();
            }).then((dataset) => {
                return store.dispatch(apiGetDataset(dataset.dataset.id));
            });
            break;

        case types.POST_ALGORITHM:
            algorithmApi.postAlgorithm(action.algorithm).then((response) => {
                return response.json();
            }).then((algorithm) => {
                return store.dispatch(apiGetAlgorithm(algorithm.algorithm.id));
            });
            break;

        case types.DELETE_DATASET:
            // console.log('Delete this dataset:', action);
            api.deleteDataset(action.id).then(() => {
                return next(datasetDeleteSuccess(action.id));
            });
            break;

        case types.PUT_DATASET:
            // console.log('Update (PUT) dataset', action);
            api.updateDataset(action.dataset.id, action.dataset.description).then((response) => {
                return response.json();
            }).then((dataset) => {
                return next(datasetReceived(dataset.dataset));
            });
            break;

        case types.GENERATE_TRIPLES:
            tasksApi.generateTriples(action.datasetId, action.graphPattern, action.maxLevels).then((response) => {
                if(response.status === 202) {
                    return response.json();
                } else {
                    console.log(response);
                }
            }).then(() => {
                // Maybe is better to do an GET_TASK action
                return store.dispatch(apiGetDataset(action.datasetId));
            });
            break;

        case types.TRAIN_DATASET:
            tasksApi.trainDataset(action.datasetId, action.algorithmId).then((response) => {
                return response.json();
            }).then(() => {
                // Reloads the dataset to get the task view reloaded
                return store.dispatch(apiGetDataset(action.datasetId));
            });
            break;

        case types.GET_TASK:
            tasksApi.getTask(action.id).then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw response.json();
                }
            }).then((task) => {
                return next(taskReceived(task.task));
            }, (error) => {
                console.log(error);
                return next(taskErrorReceived(error));
            });
            break;

        case types.GET_SUGGESTIONS:
            servicesApi.getSuggestions(action.datasetId, action.text).then((response) => {
                return response.json();
            }).then((suggestions) => {
                const suggests = [];
                suggestions.forEach((suggestion) => {
                    suggests.push(suggestion);
                });
                return next(suggestionsReceived(action.datasetId, suggests));
            });
            break;

        case types.GET_SIMILARENTITIES:
            servicesApi.getSimilarEntities(action.datasetId, action.entity).then((response) => {
                return response.json();
            }).then((similarEntities) => {
                const simEntities = [];
                similarEntities.similar_entities.response.forEach((simEnt) => {
                    simEntities.push(simEnt.object);
                });
                return next(similarEntitiesReceived(action.datasetId, action.entity, simEntities));
            });
            break;

        case types.POST_GENERATE_SEARCHTREE:
            tasksApi.generateIndex(action.datasetId).then((response) => {
                return response.json();
            }).then((task) => {
                console.log('dataService generateIndex ' + task);
                // Reloads the dataset to get the task view reloaded
                return store.dispatch(apiGetDataset(action.datasetId));
            });
            break;

        case types.POST_GENERATE_AUTOCOMPLETE_INDEX:
            tasksApi.generateAutocompleteIndex(action.datasetId).then((response) => {
                return response.json();
            }).then((task) => {
                console.log('dataService generateAutocompleteIndex ' + task);
                // Reloads the dataset to get the task view reloaded
                return store.dispatch(apiGetDataset(action.datasetId));
            });
            break;

        default:
            break;
    }
};

export default dataService;
