const { db_write, db_read } = require('../../config/db');
/**
* Get the data from database
* @param req
* @param res
* @returns {*}
*/
// Get the tutor details
function getTutor(req, res) {
    db_read.query('SELECT * FROM tutors', (err, response, fields) => {
        if (!err) {
            if ((response || []).length > 0) {
                res.send({
                    status: 200,
                    data: response
                });
            }
            else {
                res.send({
                    status: 200,
                    data: []
                });
            }
        } else {
            res.send(err);
        }
    });
}

// Get the institute details
function getInstitute(req, res) {
    db_read.query('SELECT * FROM institutes', (err, response, fields) => {
        if (!err) {
            if ((response || []).length > 0) {
                res.send({
                    status: 200,
                    data: response
                });
            }
            else {
                res.send({
                    status: 200,
                    data: []
                });
            }
        } else {
            res.send(err);
        }
    });
}

// Get the trainer details
function getTrainer(req, res) {
    db_read.query('SELECT * FROM trainers', (err, response, fields) => {
        if (!err) {
            if ((response || []).length > 0) {
                res.send({
                    status: 200,
                    data: response
                });
            }
            else {
                res.send({
                    status: 200,
                    data: []
                });
            }
        } else {
            res.send(err);
        }
    });
}

// Get the learner details
function getLearner(req, res) {
    db_read.query('SELECT * FROM learners', (err, response, fields) => {
        if (!err) {
            if ((response || []).length > 0) {
                res.send({
                    status: 200,
                    data: response
                });
            }
            else {
                res.send({
                    status: 200,
                    data: []
                });
            }
        } else {
            res.send(err);
        }
    });
}


// Get the course details based on search key
function getCourse(req, res) {
    const key ='%'+req.params.search+'%';
    if (key) {
        const SEARCH_USER_QUERY = "SELECT * FROM courses where course like '"+ key +"'";
        db_read.query(SEARCH_USER_QUERY, (err, response, fields) => {
            if (!err) {
                if ((response || []).length > 0) {
                    res.send({
                        status: 200,
                        data: response
                    });
                }
                else {
                    res.send({
                        status: 200,
                        data: []
                    });
                }
            } else {
                res.send(err);
            }
        });
    }
    else {
        res.send({
            status: 417,
            response: "Mandatory Fields are missing"
        })
    }
}

module.exports = { getTutor, getInstitute, getTrainer, getLearner, getCourse };