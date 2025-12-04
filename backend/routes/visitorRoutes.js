const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const visitorController = require('../controllers/visitorController');

// Validation middleware
const visitorValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number is required'),
  body('purpose').trim().notEmpty().withMessage('Purpose of visit is required'),
  body('company').optional().trim()
];

// Routes
router.post('/', visitorValidation, visitorController.createVisitor);
router.get('/', visitorController.getAllVisitors);
router.get('/:id', visitorController.getVisitorById);
router.put('/:id', visitorValidation, visitorController.updateVisitor);
router.delete('/:id', visitorController.deleteVisitor);

module.exports = router;
