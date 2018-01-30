"use strict" 
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface["addColumn"]("users", "cumin", Sequelize.STRING)
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface["removeColumn"]("users", "cumin", Sequelize.STRING)
    }
  }
