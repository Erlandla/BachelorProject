# TRDK1_GRAPH-NESTA

## Description
Graph-Nesta is a proof of concept of a web-based system to enhance collaboration between municipalities. The application is an open-source project created by students taking the course IT2901 at NTNU for Trondheim municipality. The project is part of a broader initiative by DigiTrøndelag called _data driven municiaplities_.<br>
The main purpose of the application is to enhance collaboration between municipalities by using graph technology to connect data-related problems and visualize them in a user-friendly manner. The application uses the [ODA-method](https://www.nesta.org.uk/blog/public-sector-data-analytics-four-steps/) to insert new data-related problems in the same format and inferencing using an ontology to infer new facts from the knowledge graph that is not explicitly present. This makes it possible to connect similar data-related problems based on shared data/fields. Lastly, the complex technology is hidden from the end-user, and hence no high technical competence is required to use Graph-Nesta.

## Visuals
The GUI is user-friendly. An administrator user has additional features compared to a regular user, such as the ability to approve problems, edit and delete all problems, and add new users.

**Frontpage and New Problem page**

<img src="./graph-nesta/frontend/public/userfrontpage.png" width="400" height="auto" alt="User frontpage">

<img src="./graph-nesta/frontend/public/newproblem.png" width="400" height="auto" alt="New problem page">

**Search page and Inspect Problem page**

<img src="./graph-nesta/frontend/public/search.png" width="400" height="auto" alt="Search page">

<img src="./graph-nesta/frontend/public/inspect.png" width="350" height="auto" alt="Inspect problem page">


**Admin frontpage** <br>
<img src="./graph-nesta/frontend/public/adminfrontpage.png" width="400" height="auto" alt="Admin frontpage with admin panel and two additional buttons: Godkjenn problem and Ny bruker">

## Installation and Running Graph-Nesta
### Backend
```
cd graph-nesta/backend
npm install
docker-compose build
docker-compose up -d
npm start
```
Open [http://localhost:7200](http://localhost:7200) to view GraphDB in your browser.
For more in-depth information about the backend see the readme in `graph-nesta/backend `

### Frontend
```
cd graph-nesta/frontend
npm install
npm start
```
Opens [http://localhost:3000](http://localhost:3000) to view Graph-Nesta in your browser.

### Mock Database
By running the commands in `Backend` above, a mock database is set up using docker. The mock database contains some data-related problems and some initial users.

|            Email            | Password |  Type |
|:---------------------------:|:--------:|:-----:|
| admin@trondheim.kommune.no  | admin    | admin |
| bruker@trondheim.kommune.no | bruker   | user  |
| bruker@malvik.kommune.no    | bruker   | user  |

### Known Bugs
- As an administrator. It is not possible to use "Business/third sector" as the value for the accessible data category field, due to no parsing before data is sent to the backend.

## Testing
A combination of manual and automated software testing was used to test the application. Initially, manual testing was performed, and later on, automated testing tools were employed to create and execute tests. Moreover, a validation test was conducted with test subjects being facilitated by Trondheim municipality to obtain feedback on the overall application's usability.

### Unit & Snapshot Testing
```
cd graph-nesta/frontend
npm test
a (to run all tests)
```

<img src="./graph-nesta/frontend/public/unitSnapshotTest.png" width="350" height="auto" alt="Unit & Snapshot Testing Results.">

### End-To-End Testing
Terminal 1
```
cd graph-nesta/backend
npm run
```
Terminal 2
```
cd graph-nesta/frontend
npm run
```

Terminal 3
```
npm run cypress:open
```
- Wait for the Cypress application to open.
- Choose E2E-testing and then browser.
- Choose the test file to run.

<img src="./graph-nesta/frontend/public/AdminStaging.png" width="350" height="auto" alt="AdminStaging E2E Results.">\
<img src="./graph-nesta/frontend/public/Interaction.png" width="350" height="auto" alt="Interaction E2E Results.">\
<img src="./graph-nesta/frontend/public/Login.png" width="350" height="auto" alt="Login E2E Results.">\
<img src="./graph-nesta/frontend/public/Problems.png" width="350" height="auto" alt="Problems E2E Results.">\

## Authors and acknowledgment
Students that have contributed to creating Graph-Nesta:
- Jesper Barfod
- Andreas Ringereide Berg
- Edvard Bjørnevik
- Silviu Catalin Mihai
- Mats Thoresen Nylander
- Magne Slåtsveen
- Erland Lie Amundgård

## License
Graph-Nesta is an open-source project with, GNU 3.0 License.
