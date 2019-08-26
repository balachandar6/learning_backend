const { db_write, db_read } = require('../../config/db');
/**
* Learner registration for learning react
* @param req
* @param res
* @returns {*}
*/
function registerLeaner(req, res) {
    const {
        name, email, countryCode = "+91", mobileNumber, gender
    } = req.body;
    if (email && mobileNumber && name) {
        db_read.query('SELECT learnerCode FROM learners where mobileNumber = ?', [mobileNumber], (err, response, fields) => {
            if (!err && (response || []).length === 0) {
                const INSERT_USER_QUERY = `INSERT INTO learners(name, email, countryCode, mobileNumber, gender)
                VALUES('${name}', '${email}', '${countryCode}', '${mobileNumber}', '${gender}')`;
                db_write.query(INSERT_USER_QUERY, (err, response, fields) => {
                    if (err) {
                        res.status(401).send({ error: 'Faild', ...err });
                    } else {
                        console.log(response);
                        res.status(200).send({
                            status: 'Created',
                            learnerCode: response.insertId
                        });
                    }
                });
            } else {
                if ((response || []).length) {
                    res.status(417).send({ error: 'Mobile Number Already Registered' });
                } else {
                    if (err.code === "ER_NO_SUCH_TABLE") {
                        const CREATE_TABLE = `CREATE TABLE learners (
                            learnerCode INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(50) NOT NULL,
                            email VARCHAR(50) NOT NULL,
                            countryCode VARCHAR(50) NULL,
                            mobileNumber VARCHAR(50) NOT NULL,
                            gender ENUM('Male', 'Female', 'Others') NOT NULL
                        )`;
                        db_write.query(CREATE_TABLE, (error, response, fields) => {
                            if (error) {
                                res.send(err);
                            } else {
                                registerLeaner(req, res);
                            }
                        });
                    } else {
                        res.send(err);
                    }
                }
            }
        });
    } else {
        res.send({
            status: 417,
            response: "Mandatory Fields are missing"
        })
    }


}

module.exports = { registerLeaner };