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

    getAlgorithms() {
        return fetch(this.baseUri + '/algorithms');
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

class ServicesApi {
    constructor(baseUri) {
        this.baseUri = baseUri;
    }

    getSuggestions(datasetId, text) {
        return fetch(this.baseUri + '/datasets/' + datasetId + '/suggest_name', {
            method: 'POST',
            body: JSON.stringify({
                input: text
            })
        });
    }

    getSimilarEntities(datasetId, selectedEntity) {
        console.log('API sobre: ', selectedEntity.entity_uri);
        return fetch(this.baseUri + '/datasets/' + datasetId + '/similar_entities?object=True', {
            method: 'POST',
            body: JSON.stringify({
                entity: {
                    value: selectedEntity.entity_uri,
                    type: 'uri',
                }
            })
        });
    }
}

export { DatasetApi, AlgorithmApi, ServicesApi };
