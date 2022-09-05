const express = require('express')
const todosRouter = express.Router()
const todosController = require('../controllers/todos')
const passport = require('passport')


// todosRouter.get('/', (req,res) => res.json('getting root'))

todosRouter.get('/', passport.authenticate('jwt', { session: false }), todosController.getTodos)
todosRouter.post('/addTodo', passport.authenticate('jwt', { session: false }), todosController.addTodo)
todosRouter.put('/toggleComplete', passport.authenticate('jwt', { session: false }), todosController.toggleComplete)
todosRouter.delete('/removeTodo', passport.authenticate('jwt', { session: false }), todosController.removeTodo)
// todosRouter.delete('/removeTodo', () => console.log('durrrrrrr'))

module.exports = todosRouter

