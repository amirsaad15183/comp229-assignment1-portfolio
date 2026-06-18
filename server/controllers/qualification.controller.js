import Qualification from '../models/qualification.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
  try {
    const qualification = new Qualification(req.body)
    const savedQualification = await qualification.save()
    return res.status(201).json(savedQualification)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find().sort({ createdAt: -1 })
    return res.json(qualifications)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const qualificationByID = async (req, res, next, id) => {
  try {
    const qualification = await Qualification.findById(id)
    if (!qualification) {
      return res.status(404).json({ error: 'Qualification not found' })
    }
    req.qualification = qualification
    return next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve qualification' })
  }
}

const read = (req, res) => res.json(req.qualification)

const update = async (req, res) => {
  try {
    let qualification = req.qualification
    qualification = extend(qualification, req.body)
    const updatedQualification = await qualification.save()
    return res.json(updatedQualification)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const remove = async (req, res) => {
  try {
    const deletedQualification = await req.qualification.deleteOne()
    return res.json(deletedQualification)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const removeAll = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({})
    return res.json(result)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default {
  create,
  list,
  qualificationByID,
  read,
  update,
  remove,
  removeAll,
}
