const db = require('./db');

const processInstallment = async (sipId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run("BEGIN TRANSACTION");

            db.get(`SELECT s.*, f.current_nav FROM sips s 
                    JOIN funds f ON s.fund_id = f.id 
                    WHERE s.id = ?`, [sipId], (err, sip) => {
                
                if (err || !sip) {
                    db.run("ROLLBACK");
                    return reject(err || "SIP not found");
                }

                const units = sip.amount / sip.current_nav;
                const sql = `INSERT INTO transactions (sip_id, investor_id, fund_id, units_allotted, nav_at_transaction, amount_paid)
                             VALUES (?, ?, ?, ?, ?, ?)`;
                
                db.run(sql, [sip.id, sip.investor_id, sip.fund_id, units, sip.current_nav, sip.amount], function(err) {
                    if (err) {
                        db.run("ROLLBACK");
                        return reject(err);
                    }
                    db.run("COMMIT");
                    resolve({ transactionId: this.lastID, units });
                });
            });
        });
    });
};

const getTransactions = (investorId) => {
    const sql = `
        SELECT t.id, f.fund_name, t.units_allotted, t.nav_at_transaction, t.amount_paid, t.transaction_date
        FROM transactions t
        JOIN funds f ON t.fund_id = f.id
        WHERE t.investor_id = ?
        ORDER BY t.transaction_date DESC`;
    return new Promise((resolve, reject) => {
        db.all(sql, [investorId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
};

const createSIP = async (data) => {
    const sql = `INSERT INTO sips (investor_id, fund_id, amount, execution_date, status) 
                 VALUES (?, ?, ?, ?, ?)`;
    const status = data.status || 'ACTIVE';

    return new Promise((resolve, reject) => {
        db.run(sql, [data.investor_id, data.fund_id, data.amount, data.execution_date, status], function(err) {
            if (err) return reject(err);
            resolve({ id: this.lastID });
        });
    });
};

const getSipById = (id) => {
    const sql = `SELECT * FROM sips WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.get(sql, [id], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
};

module.exports = { processInstallment, getTransactions, createSIP, getSipById };