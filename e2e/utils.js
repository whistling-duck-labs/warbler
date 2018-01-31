import electron from "electron";
import { Application } from "spectron";
import { fromJS } from "immutable";

const beforeEach = function() {
  this.timeout(10000);
  this.app = new Application({
    path: electron,
    args: ["."],
    startTimeout: 10000,
    waitTimeout: 10000
  });
  return this.app.start();
};

const afterEach = function() {
  this.timeout(10000);
  if (this.app && this.app.isRunning()) {
    return this.app.stop();
  }
  return undefined;
};

const db = fromJS(
      [
        { //model object
          key: 1,
          name: 'users',
          attributes: [
            { // attribute objects
              key: 1,
              name: 'name',
              type: 'string',
              allowNull: false
            },
            {
              key: 2,
              name: 'email',
              type: 'string',
              allowNull: false
            }
          ]
        }
      ])

const targetDb = db.setIn(['0', 'attributes', '2'], fromJS({name: 'isAdmin', type: 'boolean'}))

export default {
  beforeEach,
  afterEach,
  db,
  targetDb
};
