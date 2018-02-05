import {initDB, INIT_DB} from '../store/db'
import {fromJS} from 'immutable'
import {expect} from 'chai'

describe('actions', () => {
  it('should create an action to add a db', () => {
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

    const expectedAction = {
      type: INIT_DB,
      db: db
    }
    const actualAction = initDB(db)

    expect(expectedAction).to.deep.equal(actualAction)
  })
})
