import Project from '../model/project.js'

export const getAll = async (req, res) => {
  try {
    const data = await Project.find()
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getById = async (req, res) => {
  try {
    const data = await Project.findById(req.params.id)
    if (!data) return res.status(404).json({ message: 'Project not found' })
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const create = async (req, res) => {
  try {
    const item = new Project(req.body)
    const saved = await item.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const update = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ message: 'Project not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const remove = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Project not found' })
    res.json({ message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const removeAll = async (req, res) => {
  try {
    await Project.deleteMany()
    res.json({ message: 'All projects removed' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
