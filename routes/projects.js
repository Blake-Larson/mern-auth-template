const express = require('express')
const projectsRouter = express.Router()
const projectsController = require('../controllers/projects')
const passport = require('passport')

projectsRouter.get('/', passport.authenticate('jwt', { session: false }), projectsController.getProjects)
projectsRouter.get('/:id', passport.authenticate('jwt', { session: false }), projectsController.getTodosByProject)
projectsRouter.post('/createProject', passport.authenticate('jwt', { session: false }), projectsController.createProject)

module.exports = projectsRouter

