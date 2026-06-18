import Contact from '../models/contact.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
  try {
    const contact = new Contact(req.body)
    const savedContact = await contact.save()
    return res.status(201).json(savedContact)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const list = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    return res.json(contacts)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id)
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' })
    }
    req.contact = contact
    return next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve contact' })
  }
}

const read = (req, res) => res.json(req.contact)

const update = async (req, res) => {
  try {
    let contact = req.contact
    contact = extend(contact, req.body)
    const updatedContact = await contact.save()
    return res.json(updatedContact)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const remove = async (req, res) => {
  try {
    const deletedContact = await req.contact.deleteOne()
    return res.json(deletedContact)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const removeAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany({})
    return res.json(result)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, contactByID, read, update, remove, removeAll }
