import {getMigrationAction} from '../../scripts/migrationScript'
import {expect} from 'chai'

describe('The migration script', () => {
  describe('has a getMigrationAction function', () =>{
    it('returns add migration action', () => {
    let op = 'add',
        changePath = '/3/attributes/3'

      expect(getMigrationAction(op, changePath)).to.equal('addColumn')
    }),
    it('returns removeColumn migration action', () => {
      let op = 'remove',
          changePath = '/3/attributes/3'

      expect(getMigrationAction(op, changePath)).to.equal('removeColumn')
    }),
    it('throws a new error', () => {
      let op ='puppyBowl',
          changePath = '/3/attributes/3',
          error = `migration type error, with operation ${op} and path ${changePath}`

      expect(getMigrationAction(op, changePath)).to.be.an.instanceOf(Error)
    })
  })
})
