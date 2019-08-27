const { db_write, db_read } = require('../../config/db');
/**
* Add Course
* @param req
* @param res
* @returns {*}
*/
function addCourse(req, res) {
    const {
        course
    } = req.body;
    if (course) {
        db_read.query('SELECT course FROM courses where course = ?', [course], (err, response, fields) => {
            if (!err && (response || []).length === 0) {
                const INSERT_USER_QUERY = `INSERT INTO courses(course)
                VALUES('${course}')`;
                db_write.query(INSERT_USER_QUERY, (err, response, fields) => {
                    if (err) {
                        res.status(401).send({ error: 'Faild', ...err });
                    } else {
                        res.status(200).send({
                            status: 'Created'
                        });
                    }
                });
            } else {
                if ((response || []).length) {
                    res.status(417).send({ error: 'Already Registered' });
                } else {
                    if (err.code === "ER_NO_SUCH_TABLE") {
                        const CREATE_TABLE = `CREATE TABLE courses (
                            courseCode INT AUTO_INCREMENT PRIMARY KEY,
                            course VARCHAR(50) NOT NULL
                        )`;
                        db_write.query(CREATE_TABLE, (error, response, fields) => {
                            if (error) {
                                res.send(err);
                            } else {
                                addCourse(req, res);
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

module.exports = { addCourse };