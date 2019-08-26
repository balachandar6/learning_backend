const { db_write, db_read } = require('../../config/db');
/**
* Register learner details
* @param req
* @param res
* @returns {*}
*/
function registerLearnerDetail(req, res) {
    const {
        learnerCode, course, location, mode
    } = req.body;
    if (course && mode) {
        let modeValue = (mode || []).join(',');
        let courseValue = (course || []).join(',');
        db_read.query('SELECT learnerCode FROM learners where learnerCode = ?', [learnerCode], (err, response, fields) => {
            if (!err) {
                if ((response || []).length === 0) {
                    res.send({
                        status: 404,
                        response: "learner code not found"
                    })
                }
                else {
                    db_read.query('SELECT * from learnerDetails', (err, response, fields) => {
                        if (!err) {
                            const INSERT_USER_QUERY = `INSERT INTO learnerDetails(learnerCode, course, location, mode)
                            VALUES(${learnerCode}, '${courseValue}', '${location}', '${modeValue}')`;
                            db_write.query(INSERT_USER_QUERY, (err, response, fields) => {
                                if (err) {
                                    res.status(401).send({ error: 'Faild', ...err });
                                } else {
                                    res.status(200).send({
                                        status: 'Created'
                                    });
                                }
                            });
                        }
                        else {
                            if (err.code === "ER_NO_SUCH_TABLE") {
                                const CREATE_TABLE = `CREATE TABLE learnerDetails (
                                learnerCode INT PRIMARY KEY,
                                course VARCHAR(50) NOT NULL,    
                                location VARCHAR(50) NULL,
                                mode VARCHAR(50) NOT NULL)`;
                                db_write.query(CREATE_TABLE, (error, response, fields) => {
                                    if (error) {
                                        res.send(err);
                                    } else {
                                        registerLearnerDetail(req, res);
                                    }
                                });
                            }
                            else {
                                res.send(err);
                            }
                        }
                    })
                }
            }
            else {
                res.send(err);
            }
        });
    }
    else {
        res.send({
            status: 417,
            response: "Fields are missing"
        })
    }
}
module.exports = { registerLearnerDetail };