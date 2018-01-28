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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _chai = __webpack_require__(3);

var _utils = _interopRequireDefault(__webpack_require__(4));

var _db = __webpack_require__(7);

var _immutable = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("application launch", () => {
  beforeEach(_utils.default.beforeEach);
  afterEach(_utils.default.afterEach);
  it("shows hello world text on screen after launch", function () {
    return this.app.client.getText("#greet").then(text => {
      (0, _chai.expect)(text).to.equal("Let's Migrate!");
    });
  });
});
describe('actions', () => {
  it('should create an action to add a db', () => {
    const db = (0, _immutable.fromJS)({
      users: {
        name: {
          type: 'string',
          allowNull: false
        }
      }
    });
    const expectedAction = (0, _immutable.Map)({
      type: _db.INIT_DB,
      db
    });
    console.log((0, _db.initDB)(db));
    (0, _chai.expect)(expectedAction.equals((0, _db.initDB)(db))).to.equal(true);
  });
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("chai");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _electron = _interopRequireDefault(__webpack_require__(5));

var _spectron = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const beforeEach = function () {
  this.timeout(10000);
  this.app = new _spectron.Application({
    path: _electron.default,
    args: ["."],
    startTimeout: 10000,
    waitTimeout: 10000
  });
  return this.app.start();
};

const afterEach = function () {
  this.timeout(10000);

  if (this.app && this.app.isRunning()) {
    return this.app.stop();
  }

  return undefined;
};

var _default = {
  beforeEach,
  afterEach
};
exports.default = _default;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("spectron");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.initDB = exports.INIT_DB = void 0;

const {
  Map
} = __webpack_require__(0);

const diff = __webpack_require__(8); // actions


const INIT_DB = 'INIT_DB';
exports.INIT_DB = INIT_DB;

const initDB = db => ({
  type: INIT_DB,
  db
}); // initial state


exports.initDB = initDB;
const initialDB = Map({}); // reducer

function _default(state = initialDB, action) {
  switch (action.type) {
    case INIT_DB:
      return action.db;

    default:
      return state;
  }
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("immutablediff");

/***/ })
/******/ ]);
//# sourceMappingURL=e2e.js.map