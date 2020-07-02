var db = require('../db/db.json');

//to read the file db/json and 
module.exports = function (app){
    app.get('/api/notes', function (req, res){
        fs.readFile('../db/db.json'), function (err, data) {
            const jsonData = JSON.parse(data);
            console.log("Data: ", data);
            res.json(jsonData);
        };
    });

//to add a note  to the db.json
    app.post('api/notes', function (req, res){
        const data = req.body
        console.log(JSON.stringify(data))
        fs.writeFile("../db/db.json"), data, function (err, data) {
            if(err) throw err;
            console.log(data);
        db.push(req.body);
        res.json(db);    
        }
    });
}