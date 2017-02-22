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

    deleteDataset(datasetId) {
        return fetch(this.baseUri + '/datasets/' + datasetId, {
            method: 'DELETE'
        });
    }
}

export default DatasetApi;

// class Api {
//     constructor(base_uri) {
//         this.base_uri = base_uri;
//     }
//
//     getDataset(datasetId) {
//         return this.base_uri+"/datasets/"+datasetId+"?use_cache=True"
//     }
// }
