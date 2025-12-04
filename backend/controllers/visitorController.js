const { validationResult } = require('express-validator');
const visitorModel = require('../models/visitorModel');

// Create a new visitor
exports.createVisitor = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, purpose, company } = req.body;
    const visitor = await visitorModel.createVisitor({
      name,
      email,
      phone,
      purpose,
      company
    });

    res.status(201).json({
      message: 'Visitor created successfully',
      data: visitor
    });
  } catch (error) {
    console.error('Error creating visitor:', error);
    res.status(500).json({ 
      error: 'Failed to create visitor',
      message: error.message 
    });
  }
};

// Get all visitors
exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await visitorModel.getAllVisitors();
    res.status(200).json({
      message: 'Visitors retrieved successfully',
      data: visitors,
      count: visitors.length
    });
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({ 
      error: 'Failed to fetch visitors',
      message: error.message 
    });
  }
};

// Get visitor by ID
exports.getVisitorById = async (req, res) => {
  try {
    const { id } = req.params;
    const visitor = await visitorModel.getVisitorById(id);

    if (!visitor) {
      return res.status(404).json({ error: 'Visitor not found' });
    }

    res.status(200).json({
      message: 'Visitor retrieved successfully',
      data: visitor
    });
  } catch (error) {
    console.error('Error fetching visitor:', error);
    res.status(500).json({ 
      error: 'Failed to fetch visitor',
      message: error.message 
    });
  }
};

// Update visitor
exports.updateVisitor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, email, phone, purpose, company } = req.body;
    
    const visitor = await visitorModel.updateVisitor(id, {
      name,
      email,
      phone,
      purpose,
      company
    });

    if (!visitor) {
      return res.status(404).json({ error: 'Visitor not found' });
    }

    res.status(200).json({
      message: 'Visitor updated successfully',
      data: visitor
    });
  } catch (error) {
    console.error('Error updating visitor:', error);
    res.status(500).json({ 
      error: 'Failed to update visitor',
      message: error.message 
    });
  }
};

// Delete visitor
exports.deleteVisitor = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await visitorModel.deleteVisitor(id);

    if (!result) {
      return res.status(404).json({ error: 'Visitor not found' });
    }

    res.status(200).json({
      message: 'Visitor deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting visitor:', error);
    res.status(500).json({ 
      error: 'Failed to delete visitor',
      message: error.message 
    });
  }
};
