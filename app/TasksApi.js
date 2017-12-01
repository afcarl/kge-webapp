class TasksApi {
    constructor(baseUri) {
        this.baseUri = baseUri;
    }

    getTask(id, redirect = false) {
        return fetch(this.baseUri + '/tasks/' + id + '?no_redirect=' + !redirect);
    }

    generateTriples(datasetId, graphPattern, maxLevels, ignore = false) {
        return fetch(this.baseUri + '/datasets/' + datasetId + '/generate_triples?ignore_status=' + ignore, {
            method: 'POST',
            body: JSON.stringify({
                generate_triples: {
                    levels: maxLevels,
                    graph_pattern: graphPattern,
                }
            })
        });
    }

    trainDataset(datasetId, algorithmId, ignore = true) {
        return fetch(this.baseUri + '/datasets/' + datasetId + '/train?ignore_status=' + ignore + '&algorithm_id=' + algorithmId, {
            method: 'POST'
        });
    }

    generateIndex(datasetId, nTrees = 100, ignore = true) {
        return fetch(this.baseUri + '/datasets/' + datasetId + '/generate_index?n_trees=' + nTrees + '&ignore_status=' + ignore, {
            method: 'POST'
        });
    }

    generateAutocompleteIndex(datasetId, ignore = true) {
        return fetch(this.baseUri + '/datasets/' + datasetId + '/generate_autocomplete_index?ignore_status=' + ignore, {
            method: 'POST',
            body: JSON.stringify({
                langs: ['en', 'es']
            })
        });
    }
}

export default TasksApi;
