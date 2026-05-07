const InvestorModel = require('../models/investorModel');

const register = async (req, res) => {
    try {
        const result = await InvestorModel.createInvestor(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const login = async (req, res) => {
    try {
        const result = await InvestorModel.loginInvestor(req.body.email, req.body.password);
        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

const getInvestorById = async (req, res) => {
    try {
        const result = await InvestorModel.getInvestorById(req.params.investorId);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getInvestorHoldings = async (req, res) => {
    try {
        const rows = await InvestorModel.getHoldings(req.params.investorId);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getNetWorth = async (req, res) => {
    try {
        const row = await InvestorModel.getNetWorth(req.params.investorId);
        res.json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const logout = async (req, res) => {
    try {
        await InvestorModel.logout(req.token);
        res.json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login, getNetWorth, getInvestorById, getInvestorHoldings, logout };