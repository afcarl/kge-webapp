import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
// import FilterableTable from './containers/FilterableTable';
import Home from './containers/Home';
import Dataset from './components/Dataset';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/dataset/:id" component={Dataset} />
	</Route>
);
