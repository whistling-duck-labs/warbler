"use strict" 
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface["addColumn"]("users", "pepper", Sequelize.STRING)
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface["removeColumn"]("users", "pepper", Sequelize.STRING)
    }
  }
