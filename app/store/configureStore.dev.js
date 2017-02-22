import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';
// import DevTools from '../containers/DevTools';
import dataService from '../middleware/dataService';
import createLogger from 'redux-logger';

const logger = createLogger();

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(dataService, logger)
        // DevTools.instrument()
    );

    return store;
}
