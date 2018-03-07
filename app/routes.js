var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        if (err) {
            res.send(err);
        }

        res.json(todos);
    });
};

module.exports = function (app) {

    app.get('/api/todos', function (req, res) {
        getTodos(res);
    });

    app.post('/api/todos', function (req, res) {


        Todo.create({
            description: req.body.description,
            notes: req.body.notes,
            due_date: req.body.due_date,
            category: req.body.category,
            priority: req.body.priority
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });

    });

    app.put('/api/todos', function(req,res){

        var id = req.body._id;
        var description = req.body.description;
        var notes = req.body.notes;
        var status = req.body.status;
        var due_date = req.body.due_date;
        var category = req.body.category;
        var priority = req.body.priority;

        var oldTodo = null;
        Todo.findOne({_id: id},function(err,result){
            if(err){

                console.log(err);
                return;
            }
            
            oldTodo = result;
            if(!oldTodo)
              return;

            oldTodo.description = description;
            oldTodo.notes = notes;
            oldTodo.status = status;
            oldTodo.due_date = due_date;
            oldTodo.category = category;
            oldTodo.priority = priority;
            console.log(oldTodo);
            Todo.updateOne({_id: id},{
                description: description,
                notes: notes,
                status: status,
                due_date: due_date,
                category: category,
                priority: priority
                }
            , function(err, todo){
                 if(err)
                    res.send(err);
                getTodos(res);
            });

        });
    

        

    });

    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};
