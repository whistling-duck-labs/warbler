/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("chai");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.fetchDb = exports.INIT_DB = void 0;

var _immutable = __webpack_require__(0);

var _getModelInfo = _interopRequireDefault(__webpack_require__(9));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// actions
const INIT_DB = 'INIT_DB';
exports.INIT_DB = INIT_DB;

const initDB = db => ({
  type: INIT_DB,
  db: db
}); // thunk


const fetchDb = dbName => dispatch => {
  // fetch all db info
  (0, _getModelInfo.default)(dbName).then(db => dispatch(initDB(db))).catch(console.error);
}; // initial state


exports.fetchDb = fetchDb;
const initialDB = (0, _immutable.List)([]); // reducer

function _default(state = initialDB, action) {
  switch (action.type) {
    case INIT_DB:
      return action.db;

    default:
      return state;
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

__webpack_require__(8);

__webpack_require__(10);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _chai = __webpack_require__(1);

var _hello_world = __webpack_require__(6);

var _env = _interopRequireDefault(__webpack_require__(7));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("hello world", () => {
  it("greets", () => {
    (0, _chai.expect)((0, _hello_world.greet)()).to.equal("Hello World!");
  });
  it("says goodbye", () => {
    (0, _chai.expect)((0, _hello_world.bye)()).to.equal("See ya!");
  });
  it("should load test environment variables", () => {
    (0, _chai.expect)(_env.default.name).to.equal("test");
    (0, _chai.expect)(_env.default.description).to.equal("Add here any environment specific stuff you like.");
  });
  it("babel features should work", () => {
    const a = {
      a: 1
    };
    const b = Object.assign({}, a, {
      b: 2
    });
    (0, _chai.expect)(b).to.eql({
      a: 1,
      b: 2
    });
  });
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bye = exports.greet = void 0;

const greet = () => {
  return "Let's Migrate!";
};

exports.greet = greet;

const bye = () => {
  return "See ya!";
};

exports.bye = bye;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {"name":"test","description":"Add here any environment specific stuff you like."}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _db = __webpack_require__(2);

var _immutable = __webpack_require__(0);

var _chai = __webpack_require__(1);

describe('actions', () => {
  it('should create an action to add a db', () => {
    const db = (0, _immutable.fromJS)([{
      //model object
      key: 1,
      name: 'users',
      attributes: [{
        // attribute objects
        key: 1,
        name: 'name',
        type: 'string',
        allowNull: false
      }, {
        key: 2,
        name: 'email',
        type: 'string',
        allowNull: false
      }]
    }]);
    const expectedAction = {
      type: _db.INIT_DB,
      db: db
    };
    const actualAction = (0, _db.initDB)(db);
    (0, _chai.expect)(expectedAction).to.deep.equal(actualAction);
  });
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutable = __webpack_require__(0);

async function getModelInfo(selectedDbName) {
  const {
    Client
  } = __webpack_require__(3); // We don't need username and password as long as password is null


  const portSetting = 'postgres://localhost:5432/';
  const postgresUrl = portSetting + selectedDbName;
  const client = new Client(postgresUrl);
  await client.connect(); // Get all models for the selected database

  const res = await client.query(`SELECT *
                                  FROM pg_catalog.pg_tables
                                  WHERE schemaname = 'public'`);
  const modelNames = res.rows.map(row => row.tablename);
  const promisedDB = buildModelObjects(modelNames, client);
  return Promise.all(promisedDB).then(db => (0, _immutable.fromJS)(db));
}

function buildModelObjects(modelNames, client) {
  return modelNames.map(async (model, idx) => {
    const modelObject = {
      key: idx,
      name: model,
      attributes: [] // Get each attribute on a model, their index, and data type

    };
    const attributes = await client.query(`SELECT column_name, ordinal_position, data_type
                                           FROM information_schema.columns
                                           WHERE table_name = '${model}'`);
    const modelAttributeList = buildModelAttributeList(attributes);
    modelObject.attributes = modelAttributeList;
    return modelObject;
  });
}

function buildModelAttributeList(attributes) {
  const dataTypeMapping = {
    'character varying': 'STRING',
    'integer': 'INTEGER',
    'timestamp with time zone': 'DATE',
    'boolean': 'BOOLEAN',
    'text': 'TEXT',
    'double precision': 'FLOAT'
  };
  return attributes.rows.map(attribute => {
    return {
      key: attribute.ordinal_position,
      name: attribute.column_name,
      type: dataTypeMapping[attribute.data_type] || attribute.data_type
    };
  });
}

var _default = getModelInfo;
exports.default = _default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _migrationScript = __webpack_require__(11);

var _chai = __webpack_require__(1);

describe('The migration script', () => {
  describe('has a getMigrationAction function', () => {
    it('returns add migration action', () => {
      let op = 'add',
          changePath = '/3/attributes/3';
      (0, _chai.expect)((0, _migrationScript.getMigrationAction)(op, changePath)).to.equal('addColumn');
    }), it('returns removeColumn migration action', () => {
      let op = 'remove',
          changePath = '/3/attributes/3';
      (0, _chai.expect)((0, _migrationScript.getMigrationAction)(op, changePath)).to.equal('removeColumn');
    }), it('throws a new error', () => {
      let op = 'puppyBowl',
          changePath = '/3/attributes/3',
          error = `migration type error, with operation ${op} and path ${changePath}`;
      (0, _chai.expect)((0, _migrationScript.getMigrationAction)(op, changePath)).to.be.an.instanceOf(Error);
    });
  });
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getMigrationAction = void 0;

const shell = __webpack_require__(12);

const path = __webpack_require__(13);

const diff = __webpack_require__(14);

const {
  fromJS
} = __webpack_require__(0);

const store = __webpack_require__(15);

const directoryPath = '/Users/Jon/Documents/fullstack/boilermaker'; // Regexp to get model key inside runmigrations .map

const modelKeyRegex = /\/(\d+)\//; // Required because of bug with electron and shelljs

shell.config.execPath = shell.which('node');
/******************HELPER FUNCTIONS *******************/

const createConfigFiles = (modelsPath, configPath, dbUrl) => {
  //import config data. We don't need username and password as long as password is null
  const dbName = dbUrl.replace('postgres://localhost:5432/', '');
  const config = `{
    "development": {
      "database": "${dbName}",
      "host": "127.0.0.1",
      "dialect": "postgres"
    }
  }`; // setup sequelizerc file

  shell.touch(`.sequelizerc`);
  shell.echo(`const path = require('path')\nmodule.exports = {'config': '${configPath}',\n  'models-path': '${modelsPath}'\n}`).to(`.sequelizerc`); // setup config file with db credentials

  shell.echo(config).to(`config/config.json`); // create migrations folder

  shell.mkdir(`migrations`);
};

const getMigrationAction = (op, changePath) => {
  if (changePath.includes('attributes')) {
    // for column actions
    switch (op) {
      case 'add':
        return 'addColumn';

      case 'remove':
        return 'removeColumn';

      case 'replace':
        return changePath.includes('name') ? 'renameColumn' : 'changeColumn';

      default:
        return new Error(`migration type error, with operation ${op} and path ${changePath}`);
    }
  } else {
    // for table actions
    switch (op) {
      case 'add':
        return 'createTable';

      case 'remove':
        return 'dropTable';

      case 'replace':
        return 'renameTable';

      default:
        throw new Error(`migration type error, with operation ${op} and path ${changePath}`);
    }
  }
};
/******************************************/

/****************MAIN FUNCTION *************/


exports.getMigrationAction = getMigrationAction;

const runMigration = async () => {
  // get db from store
  const state = store.default.getState();
  const db = state.get('db');
  const dbUrl = state.get('dbUrl');
  shell.echo('starting migration'); //********** setup *********//

  const modelsPath = path.resolve('server', 'db', 'models');
  const configPath = path.resolve('config', 'config.json');
  const now = Date.now(); // create config files and migration folders if they don't exist

  createConfigFiles(modelsPath, configPath, dbUrl); // ******* Find differences to migrate ***********//
  // //TESTING ONLY - SHOULD IMPORT FROM STORE
  // const attributes = db.getIn(['2', 'attributes'])
  // const targetDb = db.setIn(['2', 'attributes'], attributes.push({
  //   key: 21,
  //   name: 'oregano',
  //   type: 'INTEGER'
  // }))
  // //***************
  // get the diff between the two objects and
  // add model name and action to diff

  const listOfChanges = diff(db, targetDb).map(changeMap => {
    // add more logic here for different migrations
    // create table
    // drop table
    // rename table
    // rename column
    // change column
    let value; //figure out logic for adding value for removeAction

    const op = changeMap.get('op');
    const changePath = changeMap.get('path');
    const modelKey = changeMap.get('path').match(modelKeyRegex)[1];
    const modelName = targetDb.get(modelKey).get('name');
    return changeMap.set('model', modelName).set('action', getMigrationAction(op, changePath)).set('value', value || changeMap.value);
  }); // --> List of changes now has maps (objects) that have model, action, and value
  // create migrations file by looping through List of changes and creating functions for each. This just gets the first one.

  const model = listOfChanges.get('0').get('model');
  const action = listOfChanges.get('0').get('action');
  let downAction; // add more logic here for opposite (down) actions

  if (action === 'addColumn') {
    downAction = 'removeColumn';
  }

  const type = listOfChanges.get('0').get('value').get('type');
  const name = listOfChanges.get('0').get('value').get('name');
  const migration = `{
    up: (queryInterface, Sequelize) => {
      return queryInterface["${action}"]("${model}", "${name}", Sequelize.${type})
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface["${downAction}"]("${model}", "${name}", Sequelize.${type})
    }
  }`; // write migration file

  shell.echo(`"use strict" \nmodule.exports = ${migration}`).to(`migrations/${now}-${model}.js`); // Run migration
  //if (shell.exec(`node_modules/.bin/sequelize db:migrate`).code !== 0)

  const migrationProcess = await shell.exec(`node_modules/.bin/sequelize db:migrate`, {
    async: true
  });
  migrationProcess.stdout.on('data', function (data) {
    console.log('success', data);
  });
};

var _default = runMigration;
exports.default = _default;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("shelljs");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("immutablediff");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = __webpack_require__(16);

var _reduxImmutable = __webpack_require__(17);

var _reduxLogger = __webpack_require__(18);

var _reduxThunk = _interopRequireDefault(__webpack_require__(19));

var _db = _interopRequireDefault(__webpack_require__(2));

var _dbList = _interopRequireDefault(__webpack_require__(20));

var _targetDb = _interopRequireDefault(__webpack_require__(22));

var _dbUrl = _interopRequireDefault(__webpack_require__(23));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
const reducer = (0, _reduxImmutable.combineReducers)({
  db: _db.default,
  dbList: _dbList.default,
  targetDb: _targetDb.default,
  dbUrl: _dbUrl.default
});
const middleware = (0, _redux.applyMiddleware)(_reduxThunk.default, (0, _reduxLogger.createLogger)({
  collapsed: true
}));
const store = (0, _redux.createStore)(reducer, composeEnhancers(middleware));
var _default = store;
exports.default = _default;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("redux-immutable");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("redux-logger");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.fetchDbNames = void 0;

var _immutable = __webpack_require__(0);

var _getDatabases = _interopRequireDefault(__webpack_require__(21));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialDbList = (0, _immutable.List)(['bananas']); // action

const POPULATE_DB_LIST = 'POPULATE_DB_LIST';

const populateDbList = dbList => ({
  type: POPULATE_DB_LIST,
  dbList
}); // thunk


const fetchDbNames = () => dispatch => {
  (0, _getDatabases.default)().then(dbs => {
    const dbList = (0, _immutable.List)(dbs);
    return dispatch(populateDbList(dbList));
  }).catch(err => console.error(err));
}; // reducer


exports.fetchDbNames = fetchDbNames;

function _default(state = initialDbList, action) {
  switch (action.type) {
    case POPULATE_DB_LIST:
      return action.dbList;

    default:
      return state;
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

async function getDatabases() {
  const {
    Client
  } = __webpack_require__(3);

  const client = new Client();
  await client.connect();
  const res = await client.query('SELECT datname FROM pg_database WHERE datistemplate = false;');
  let databases = res.rows.map(anon => {
    return anon.datname;
  });
  return databases;
}

var _default = getDatabases;
exports.default = _default;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.updateDB = exports.UPDATE_DB = void 0;

var _immutable = __webpack_require__(0);

var _db = __webpack_require__(2);

// actions
const UPDATE_DB = 'UPDATE_DB';
exports.UPDATE_DB = UPDATE_DB;

const updateDB = targetDb => ({
  type: UPDATE_DB,
  targetDb
}); // reducer


exports.updateDB = updateDB;
const initialState = (0, _immutable.List)([]);

function _default(state = initialState, action) {
  switch (action.type) {
    case _db.INIT_DB:
      return action.db;

    case UPDATE_DB:
      return action.targetDb;

    default:
      return state;
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.setDbUrl = void 0;
const initialDbUrl = '127.0.0.1:5432/migrate'; // action

const SET_DB_URL = 'SET_DB_URL';

const setDbUrl = url => ({
  type: SET_DB_URL,
  url
}); // reducer


exports.setDbUrl = setDbUrl;

function _default(state = initialDbUrl, action) {
  switch (action.type) {
    case SET_DB_URL:
      return action.url;

    default:
      return state;
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=specs.js.map