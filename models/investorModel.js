const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createInvestor = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const sql = `INSERT INTO investors (name, email, password, phone) VALUES (?, ?, ?, ?)`;
    
    return new Promise((resolve, reject) => {
        db.run(sql, [data.name, data.email, hashedPassword, data.phone], function(err) {
            if (err) return reject(err);
            resolve({ id: this.lastID });
        });
    });
};

const loginInvestor = async (email, password) => {
    const sql = `SELECT * FROM investors WHERE email = ?`;
    
    const user = await new Promise((resolve, reject) => {
        db.get(sql, [email], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });

    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '10h' });
    return { token, user: { id: user.id, name: user.name } };
};

const logout = (token) => {
    const sql = `INSERT INTO token_blacklist (token) VALUES (?)`;
    return new Promise((resolve, reject) => {
        db.run(sql, [token], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

const getInvestorById = (id) => {
    const sql = `SELECT id, name, email, phone FROM investors WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.get(sql, [id], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
};

const getHoldings = (investorId) => {
    const sql = `
        SELECT f.fund_name, SUM(t.units_allotted) as total_units, 
        f.current_nav, (SUM(t.units_allotted) * f.current_nav) as current_value
        FROM transactions t
        JOIN funds f ON t.fund_id = f.id
        WHERE t.investor_id = ?
        GROUP BY f.id`;
    return new Promise((resolve, reject) => {
        db.all(sql, [investorId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
};

const getNetWorth = async (investorId) => {
    const sql = `
        SELECT SUM(t.units_allotted * f.current_nav) as total_net_worth
        FROM transactions t
        JOIN funds f ON t.fund_id = f.id
        WHERE t.investor_id = ?`;
        
    const row = await new Promise((resolve, reject) => {
        db.get(sql, [investorId], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
    return { total_net_worth: row.total_net_worth || 0 };
};

module.exports = { createInvestor, loginInvestor, getNetWorth, getInvestorById, getHoldings, logout };