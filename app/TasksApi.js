class TasksApi {
    constructor(baseUri) {
        this.baseUri = baseUri;
    }

    getTask(id, redirect = false) {
        return fetch(this.baseUri + '/tasks/' + id + '?no_redirect=' + !redirect);
    }

    generateTriples(datasetId, graphPattern, maxLevels) {
        return fetch(this.baseUri + '/datasets/' + datasetId + '/generate_triples?ignore_status=True', {
            method: 'POST',
            body: JSON.stringify({
                generate_triples: {
                    levels: maxLevels,
                    graph_pattern: graphPattern,
                }
            })
        });
    }
}

export default TasksApi;
