
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Template = require('./models/Template')

dotenv.config()

const templates = [
  {
    title: 'Nexa Analytics',
    description: 'A modern analytics dashboard for tracking business performance and key metrics.',
    category: 'Dashboard',
    image: '',
    tags: ['analytics', 'charts', 'admin'],
  },
  {
    title: 'Forma Studio',
    description: 'A bold, minimal landing page for creative studios and digital agencies.',
    category: 'Landing Page',
    image: '',
    tags: ['agency', 'creative', 'marketing'],
  },
  {
    title: 'Monogram Portfolio',
    description: 'An elegant portfolio layout for designers, developers, and freelancers.',
    category: 'Portfolio',
    image: '',
    tags: ['portfolio', 'personal', 'design'],
  },
  {
    title: 'Marketlane',
    description: 'A clean storefront template for showcasing products and online shopping.',
    category: 'E-commerce',
    image: '',
    tags: ['store', 'shopping', 'products'],
  },
  {
    title: 'Orbit Workspace',
    description: 'A polished SaaS landing page for presenting software features and pricing.',
    category: 'SaaS',
    image: '',
    tags: ['software', 'startup', 'pricing'],
  },
  {
    title: 'Sunday Journal',
    description: 'A typography-focused blog template for stories, articles, and publications.',
    category: 'Blog',
    image: '',
    tags: ['blog', 'articles', 'writing'],
  },
]

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    // Replace existing seed data to avoid duplicates on repeated runs.
    await Template.deleteMany({
      title: { $in: templates.map((template) => template.title) },
    })

    const inserted = await Template.insertMany(templates)
    console.log(`Successfully seeded ${inserted.length} templates.`)
  } catch (error) {
    console.error('Seeding failed:', error.message)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seedDatabase()
