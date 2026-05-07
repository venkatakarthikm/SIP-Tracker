const db = require("./db");

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM funds", [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
};

const create = (data) => {
    const sql = `INSERT INTO funds (fund_name, amc_name, current_nav) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
        db.run(sql, [data.fund_name, data.amc_name, data.current_nav], function(err) {
            if (err) return reject(err);
            resolve({ id: this.lastID });
        });
    });
};

const updateNav = (id, newNav) => {
    const sql = `UPDATE funds SET current_nav = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.run(sql, [newNav, id], function(err) {
            if (err) return reject(err);
            resolve({ updated: this.changes });
        });
    });
};

module.exports = { getAll, create, updateNav };