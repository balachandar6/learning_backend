const { db_write, db_read } = require('../../config/db');
/**
* Institute registration for learning react
* @param req
* @param res
* @returns {*}
*/
function registerInstitute(req, res) {
    const {
        tutorCode, address, enquireDistance, mode
    } = req.body;
    if (tutorCode && mode) {
        let modeValue = (mode || []).join(',')
        db_read.query('SELECT tutorCode, instituteName, mobileNumber FROM tutors where tutorCode = ?', [tutorCode], (err, response, fields) => {
            if (!err) {
                if ((response || []).length === 0) {
                    res.send({
                        status: 404,
                        response: "tutor code not found"
                    })
                }
                else {
                    let mobileNumberValue = response[0].mobileNumber;
                    let instituteNameValue = response[0].instituteName;
                    db_read.query('SELECT * from institutes', (err, response, fields) => {
                        if (!err) {
                            const INSERT_USER_QUERY = `INSERT INTO institutes(tutorCode, address, enquireDistance, mode, instituteName, mobileNumber)
                            VALUES('${tutorCode}', '${address}', ${enquireDistance}, '${modeValue}', '${instituteNameValue}', '${mobileNumberValue}')`;
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
                                const CREATE_TABLE = `CREATE TABLE institutes (
                                tutorCode VARCHAR(50) PRIMARY KEY,
                                address VARCHAR(50) NULL,
                                enquireDistance INT NULL,
                                mode VARCHAR(50) NOT NULL,
                                instituteName VARCHAR(50) NOT NULL,
                                mobileNumber VARCHAR(50) NOT NULL)`;
                                db_write.query(CREATE_TABLE, (error, response, fields) => {
                                    if (error) {
                                        res.send(err);
                                    } else {
                                        registerInstitute(req, res);
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
module.exports = { registerInstitute };