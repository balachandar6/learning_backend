const { db_write, db_read } = require('../../config/db');
/**
* Trainer registration for learning react
* @param req
* @param res
* @returns {*}
*/
function registerTrainer(req, res) {
    const {
        tutorCode, speak = "English", degree, enquireDistance, mode, experience
    } = req.body;
    if (mode && experience) {
        let modeValue = (mode || []).join(',')
        db_read.query('SELECT tutorCode, mobileNumber FROM tutors where tutorCode = ?', [tutorCode], (err, response, fields) => {
            if (!err) {
                if ((response || []).length === 0) {
                    res.send({
                        status: 404,
                        response: "tutor code not found"
                    })
                }
                else {
                    let mobileNumberValue = response[0].mobileNumber;
                    db_read.query('SELECT * from trainers', (err, response, fields) => {
                        if (!err) {
                            const INSERT_USER_QUERY = `INSERT INTO trainers(tutorCode, speak, degree, mode, enquireDistance, experience, mobileNumber)
                            VALUES(${tutorCode}, '${speak}', '${degree}', '${modeValue}', ${enquireDistance}, '${experience}', '${mobileNumberValue}')`;
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
                                const CREATE_TABLE = `CREATE TABLE trainers (
                                tutorCode INT PRIMARY KEY,
                                speak VARCHAR(50) NOT NULL,
                                degree VARCHAR(50) NULL,
                                mode VARCHAR(50) NOT NULL,
                                enquireDistance INT NULL,
                                experience INT NOT NULL,
                                mobileNumber VARCHAR(50) NOT NULL)`;
                                db_write.query(CREATE_TABLE, (error, response, fields) => {
                                    if (error) {
                                        res.send(err);
                                    } else {
                                        registerTrainer(req, res);
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
module.exports = { registerTrainer };