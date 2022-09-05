
const Todo = require('../models/Todo')
const User = require('../models/User')
const Project = require('../models/Project')


module.exports = {
    
    getProjects: async (req, res) => {
        User.findById({ _id: req.user._id }).populate('projects').exec((err, document)=>{
                if(err)
                    res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true }})
                else{
                    res.status(200).json({ projects: document.projects, authenticated: true })
                }
        
            })
    },
    // getTodos: async (req, res) => {
    //     User.findById({ _id: req.user._id }).populate('todos').exec((err, document)=>{
    //             if(err)
    //                 res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true }})
    //             else{
    //                 res.status(200).json({ todos: document.todos, authenticated: true })
    //             }
        
    //         })
    // },
    getTodosByProject: async (req, res) => {
        console.log('project id: '+req.params.id)
        await User.findById({ _id: req.user._id })
                            .populate([
                                {
                                    path: 'todos',
                                    model: 'Todo',
                                    populate: {
                                        path: 'project',
                                        model: 'Project'
                                    }
                                }
                            ])
                            .exec((err, document)=>{
                    if(err)
                        res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true }})
                    else{
                        if (req.params.id !== 'all-projects'){
                            document.todos = document.todos.filter(todo => String(todo.project._id) === req.params.id)
                        }else{
                            document.todos = document.todos
                        }
                        console.log('project controller todos: '+document.todos)
                        res.status(200).json({ todos: document.todos, authenticated: true })
                    }
                })
    },
    createProject: async (req, res) => {
        const project = new Project(req.body)
        await project.save(err=>{
            if(err)
                res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true }})
            else{
                req.user.projects.push(project)
                req.user.save(err=>{
                    if (err)
                        res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true }})
                    else
                        res.status(200).json({ message: { msgBody: 'Todo created!', msgError: false }})
                })
            }
        })
    },
}