import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const allContacts = await contactsService.listContacts();

  res.json(allContacts);
};

export const getOneContact = async (req, res) => {
  const contactById = await contactsService.getContactById(req.params.id);
  if (contactById === null) {
    res.status(404).json({ message: "Contact not found" });
    return;
  }
  res.json(contactById);
};

export const deleteContact = async (req, res) => {
  const deletedContact = await contactsService.removeContactById(req.params.id);
  if (deleteContact === null) {
    res.status(404).json({ message: "Contact not found" });
    return;
  }
  res.send(deletedContact);
};

export const createContact = async (req, res) => {
  const request = req.body;
  const { error, _ } = createContactSchema.validate({ ...request });

  if (error !== undefined) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const newContact = await contactsService.addContact(request);
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Body must have at least one field" });
    return;
  }

  const { error } = updateContactSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const editedContact = await contactsService.editContact(
    req.params.id,
    req.body
  );
  if (editedContact === null) {
    res.status(404).json({ message: "Contact not found" });
    return;
  }
  res.json(editedContact);
};
