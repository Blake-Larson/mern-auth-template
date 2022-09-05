
const Todo = require('../models/Todo')
const User = require('../models/User')


module.exports = {
    getTodos: async (req, res) => {
        User.findById({ _id: req.user._id }).populate('todos') 
                    .populate([
                    {
                        path: 'todos',
                        model: 'Todo',
                        populate: {
                            path: 'project',
                            model: 'Project'
                        }
                    }
                ]).exec((err, document)=>{
                        if(err)
                            res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true }})
                        else{
                            res.status(200).json({ 
                                todos: document.todos, 
                                authenticated: true })
                        }
                
                    })
    },
    addTodo: async (req, res) => {
        console.log('req.body: ')
        console.log(req.body)
       
        const todo = await Todo.create({
                item: req.body.item,
                project: req.body.project,
                priority: req.body.priority,
                created: Date.now(),
                completed: false
            })
    
        

        // const todo = new Todo({
        //     item: req.body.item,
        //     project: req.body.project,
        //     // priority: req.body.priority,
        //     // created: new Date(),
        //     // completed: false
        // })

        // await todo.save(function(error) {
        //     if (!error) {
        //         Todo.find({})
        //             .populate('project')
        //             .exec(function(error, todos) {
        //                 console.log(JSON.stringify(todos, null, "\t"))
        //             })
        //         req.user.todos.push(todo)
        //         req.user.save(err=>{
        //                 if (err)
        //                     res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true }})
        //                 else
        //                     res.status(200).json({ message: { msgBody: 'Todo created!', msgError: false }})
        //         })
        //     }error => console.log(error)
        // });
// 
        // await req.user.todos.push(todo)
        // await req.user.save()
            
            
        // const todo = new Todo(req.body)
        console.log('line 55:'+todo)
        await todo.save(err=>{
            if(err)
                res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true }})
            else{
                req.user.todos.push(todo)
                req.user.save(err=>{
                    if (err)
                        res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true }})
                    else
                        res.status(200).json({ message: { msgBody: 'Todo created!', msgError: false }})
                })
            }
        })
    },
    toggleComplete: async (req, res) => {
        console.log('blah ' +req.body.todoID)
        try{
            await Todo.findById(req.body.todoID, (err, todo) => {
                if (err)
                    res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true }})
                else{
                    res.status(200).json({ message: { msgBody: 'Todo complete toggled!', msgError: false }})
                    todo.completed = !todo.completed
                    todo.save()
                }
            })
        }catch(err){
            res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true }})
        }
    },
    removeTodo: async (req, res) => {
        console.log('controller removeTodo running...')
        try{
            await Todo.findOneAndDelete({ _id: req.body.todoID })

            const user = await User.findById(req.user._id)
            user.todos.splice(user.todos.indexOf(req.body.todoID), 1)
            user.save()

            console.log('Deleted Todo')
            res.json('Deleted Todo')
        }catch(err){
            res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true }})
        }
    }
    
}