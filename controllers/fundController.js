const FundModel = require('../models/fundModel');

const getFunds = async (req, res) => {
    try {
        const rows = await FundModel.getAll();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addFund = async (req, res) => {
    try {
        const result = await FundModel.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateNav = async (req, res) => {
    try {
        await FundModel.updateNav(req.params.fundId, req.body.current_nav);
        res.json({ message: "NAV updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getFunds, addFund, updateNav };