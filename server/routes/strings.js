const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Workspace = require('../models/Workspace');
const String = require('../models/String');

// Add a new string
router.post('/', auth, async (req, res) => {
    const { key, value, workspaceId } = req.body;

    try {
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ msg: 'Workspace not found' });
        }

        const newString = new String({
            key,
            value,
            workspace: workspaceId
        });

        const string = await newString.save();
        res.json(string);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all strings for a workspace
router.get('/:workspaceId', auth, async (req, res) => {
    try {
        const strings = await String.find({ workspace: req.params.workspaceId });
        res.json(strings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
