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
}

export default TasksApi;
