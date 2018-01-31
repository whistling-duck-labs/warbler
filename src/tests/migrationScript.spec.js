import {getMigrationAction} from '../../scripts/migrationScript'
import {expect} from 'chai'

describe('The migration script', () => {
  it('has a getMigrationAction function that returns expected migration action', () => {
    let op = 'add',
        changePath = '/3/attributes/3';

    expect(getMigrationAction(op, changePath)).to.equal('addColumn');
  })
})
