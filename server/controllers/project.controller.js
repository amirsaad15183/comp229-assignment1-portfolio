import Project from '../models/project.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
  try {
    const project = new Project(req.body)
    const savedProject = await project.save()
    return res.status(201).json(savedProject)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const list = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    return res.json(projects)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const projectByID = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id)
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    req.project = project
    return next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve project' })
  }
}

const read = (req, res) => res.json(req.project)

const update = async (req, res) => {
  try {
    let project = req.project
    project = extend(project, req.body)
    const updatedProject = await project.save()
    return res.json(updatedProject)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const remove = async (req, res) => {
  try {
    const deletedProject = await req.project.deleteOne()
    return res.json(deletedProject)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const removeAll = async (req, res) => {
  try {
    const result = await Project.deleteMany({})
    return res.json(result)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, projectByID, read, update, remove, removeAll }
