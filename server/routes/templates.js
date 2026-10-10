
const express = require('express')
const mongoose = require('mongoose')
const Template = require('../models/Template')

const router = express.Router()

// Get all templates, with optional search and category filters
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query
    const filter = {}

    if (category && category !== 'All') {
      filter.category = category
    }

    if (search && search.trim()) {
      filter.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
        { tags: { $regex: search.trim(), $options: 'i' } },
      ]
    }

    const templates = await Template.find(filter).sort({ createdAt: -1 })

    res.json({
      success: true,
      count: templates.length,
      templates,
    })
  } catch (error) {
    console.error('Fetch templates error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Unable to fetch templates',
    })
  }
})

// Get one template by ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid template ID',
      })
    }

    const template = await Template.findById(req.params.id)

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      })
    }

    res.json({ success: true, template })
  } catch (error) {
    console.error('Fetch template error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Unable to fetch template',
    })
  }
})

module.exports = router
