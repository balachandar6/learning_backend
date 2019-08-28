const { db_write, db_read } = require('../../config/db');
/**
* Tutor registration for learning react
* @param req
* @param res
* @returns {*}
*/
function registerTutor(req, res) {
    const {
        name, email, countryCode = "+91", mobileNumber, gender, courses, location, isInstitute = false, instituteName
    } = req.body;
    if (email && mobileNumber && name && ((isInstitute && instituteName) || !isInstitute)) {
        let courseValue = (courses || []).join(',')
        db_read.query('SELECT tutorCode FROM tutors where mobileNumber = ?', [mobileNumber], (err, response, fields) => {
            if (!err && (response || []).length === 0) {
                const isInstituteValue = isInstitute ? 1 : 0;
                const INSERT_DUMMY_VALUE = `INSERT INTO tutors_proxy(dummyValue) VALUES('testing')`;
                db_write.query(INSERT_DUMMY_VALUE, (err, response, fields) => {
                    if (err) {
                        res.status(401).send({ error: 'Faild', ...err });
                    } else {
                        const ID_VALUE = "tutor" + response.insertId;
                        const INSERT_USER_QUERY = `INSERT INTO tutors(tutorCode, name, email, countryCode, mobileNumber, gender, courses, location, isInstitute, instituteName)
                VALUES('${ID_VALUE}', '${name}', '${email}', '${countryCode}', '${mobileNumber}', '${gender}', '${courseValue}', '${location}', '${isInstituteValue}', '${instituteName}')`;
                        db_write.query(INSERT_USER_QUERY, (err1, response1, fields) => {
                            if (err1) {
                                res.status(401).send({ error: 'Faild', ...err });
                            } else {
                                res.status(200).send({
                                    status: 'Created'
                                });
                            }
                        });
                    }
                });
            } else {
                if ((response || []).length) {
                    res.status(417).send({ error: 'Mobile Number Already Registered' });
                } else {
                    if (err.code === "ER_NO_SUCH_TABLE") {
                        const CREATE_TABLE = `CREATE TABLE tutors (
                            tutorCode VARCHAR(50) NOT NULL PRIMARY KEY,
                            name VARCHAR(50) NOT NULL,
                            email VARCHAR(50) NOT NULL,
                            countryCode VARCHAR(50) NULL,
                            mobileNumber VARCHAR(50) NOT NULL,
                            gender ENUM('Male', 'Female', 'Others') NOT NULL,
                            courses VARCHAR(50) NULL,
                            location VARCHAR(50) NULL,
                            isInstitute BOOLEAN,
                            instituteName VARCHAR(50) NULL
                        )`;
                        const CREATE_TABLE_DUMMY = `CREATE TABLE tutors_proxy (
                            tutorCode INT AUTO_INCREMENT PRIMARY KEY,
                            dummyValue VARCHAR(50) NOT NULL)`;
                        db_write.query(CREATE_TABLE_DUMMY, (error, response, fields) => {
                            if (error) {
                                res.send(error);
                            } else {
                                db_write.query(CREATE_TABLE, (error1, response1, fields) => {
                                    if (error1) {
                                        res.send(error1);
                                    } else {
                                        registerTutor(req, res);
                                    }
                                });
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

module.exports = { registerTutor };