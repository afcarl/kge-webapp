class DatasetApi {

    constructor(baseUri) {
        this.baseUri = baseUri;
    }

    getDataset(id, cache = true) {
        return fetch(this.baseUri + '/datasets/' + id + '?use_cache=' + cache);
    }
    getAll(cache = true) {
        return fetch(this.baseUri + '/datasets?use_cache=' + cache);
    }

    postDataset(name, description, datasetType = 1) {
        return fetch(this.baseUri + '/datasets?dataset_type=' + datasetType, {
            method: 'POST',
            body: JSON.stringify({
                name,
                description
            })
        });
    }
    updateDataset(id, description) {
        return fetch(this.baseUri + '/datasets/' + id, {
            method: 'PUT',
            body: JSON.stringify({
                description
            })
        });
    }
    deleteDataset(datasetId) {
        return fetch(this.baseUri + '/datasets/' + datasetId, {
            method: 'DELETE'
        });
    }
}


class AlgorithmApi {
    constructor(baseUri) {
        this.baseUri = baseUri;
    }

    getAlgorithm(algorithmId) {
        return fetch(this.baseUri + '/algorithms/' + algorithmId);
    }

    postAlgorithm(userAlgorithm) {
        return fetch(this.baseUri + '/algorithms/', {
            method: 'POST',
            body: JSON.stringify({
                algorithm: {
                    embedding_size: userAlgorithm.embeddingSize,
                    margin: userAlgorithm.margin,
                    max_epochs: userAlgorithm.maxEpochs,
                }
            })
        });
    }
}

export { DatasetApi, AlgorithmApi };
