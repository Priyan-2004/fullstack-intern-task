
const express = require('express')
const mongoose = require('mongoose')
const Favorite = require('../models/Favorite')
const Template = require('../models/Template')
const authenticateToken = require('../middleware/auth')

const router = express.Router()

// Get the logged-in user's favorites
router.get('/', authenticateToken, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.userId })
      .populate('template')

    const templates = favorites
      .filter((favorite) => favorite.template)
      .map((favorite) => favorite.template)

    res.json({
      success: true,
      count: templates.length,
      favorites: templates,
    })
  } catch (error) {
    console.error('Fetch favorites error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Unable to fetch favorites',
    })
  }
})

// Add a template to favorites
router.post('/:templateId', authenticateToken, async (req, res) => {
  try {
    const { templateId } = req.params

    if (!mongoose.isValidObjectId(templateId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid template ID',
      })
    }

    const template = await Template.findById(templateId)

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      })
    }

    const favorite = await Favorite.findOneAndUpdate(
      { user: req.userId, template: templateId },
      { $setOnInsert: { user: req.userId, template: templateId } },
      { upsert: true, new: true, runValidators: true }
    )

    res.status(200).json({
      success: true,
      message: 'Template added to favorites',
      favorite,
    })
  } catch (error) {
    console.error('Add favorite error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Unable to add favorite',
    })
  }
})

// Remove a template from favorites
router.delete('/:templateId', authenticateToken, async (req, res) => {
  try {
    const { templateId } = req.params

    if (!mongoose.isValidObjectId(templateId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid template ID',
      })
    }

    const result = await Favorite.findOneAndDelete({
      user: req.userId,
      template: templateId,
    })

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found',
      })
    }

    res.json({
      success: true,
      message: 'Template removed from favorites',
    })
  } catch (error) {
    console.error('Remove favorite error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Unable to remove favorite',
    })
  }
})

module.exports = router
