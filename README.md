

# kge-webapp

This is the webapp for running [KGE-server](https://github.com/vfrico/kge-server)

Is available as a docker image on [Docker Hub](https://hub.docker.com/r/vfrico/kge-webapp/)

Uses React and Redux, and was created from this boilerplate: [webpack-react-redux](https://github.com/jpsierens/webpack-react-redux)

If you run your own service you might want to customize the endpoint URI. This can be changed on `app/reducers/index.js`. The variable `defaultConfig` contains `apiRoute`, that can be modified to point to your own endpoint.
