import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';
// import DevTools from '../containers/DevTools';
import dataService from '../middleware/dataService';

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(dataService)
        // DevTools.instrument()
    );

    return store;
}
