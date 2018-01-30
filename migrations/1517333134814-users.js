"use strict" 
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface["addColumn"]("users", "oregano", Sequelize.INTEGER)
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface["removeColumn"]("users", "oregano", Sequelize.INTEGER)
    }
  }
