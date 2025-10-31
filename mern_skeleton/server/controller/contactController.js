import Contact from '../model/contact.js'

// GET all contacts
export const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find()
    res.json(contacts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET by ID
export const getById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ message: 'Contact not found' })
    res.json(contact)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST create new
export const create = async (req, res) => {
  try {
    const newContact = new Contact(req.body)
    const saved = await newContact.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// PUT update by ID
export const update = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ message: 'Contact not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// DELETE by ID
export const remove = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Contact not found' })
    res.json({ message: 'Contact deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE all
export const removeAll = async (req, res) => {
  try {
    await Contact.deleteMany()
    res.json({ message: 'All contacts removed' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
