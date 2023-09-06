# Backend

`npm start` to start the backend. Starts on port 8080\
Open [http://localhost:7200](http://localhost:7200) to view GraphDB in your browser.

## Setting up graphDB in docker

GraphDB is set up with docker, with a repository and owl 
file being loaded on compose. 
The project has configured a default setup for the database with docker-compose. GraphDB should be set up in a container with both a repository and the ontology loaded in. In addition, some initial Users and ODA problems have been added to the config. 

Setting up the database for local development is done by the following commands:
````
cd backend
npm install
docker-compose build
docker-compose up -d
````
Eventually, leave out the "-d" flag if you want the docker instance to run in the terminal.

## Changing the GraphDB setup
The repository settings are stored in `database/config/TRDK1_GRAPHDB-config.ttl`. Some central options include the repositoryID and the graphdb ruleset.

The RDF data file is saved in `database/ontology/statements.rj` and is automatically imported to the project. This includes both the ontology and some initial data as described above.

An owl file with the ontology, but without the initial data can be found in `database/baseRepo/ODAOntology.owl`. 

Any file with RDF statements will be imported to the database as long as it is located within `database/ontology`. Both the owl format and rj format work in this instance, among others.

## Structure

### SPARQL

All SPARQL queries are stored in the `src/database/queries`. The basis of updating data in the database is the SPARQL queries.

### Database integration

The Backend connects to the database through the RDF4j REST API. The base URLs are stored in `src/database/api/endpoints.ts`, while the specific Axios methods are defined in the other files in `src/database/api`.



### Express

The backend connects to the frontend through expressjs. The routes are specified in the different files in `src/routes`.

