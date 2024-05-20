import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(data);
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function getContacts() {
  const contacts = await listContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  if (typeof contact === "undefined") {
    return null;
  }

  return contact;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = { id: crypto.randomUUID(), name, email, phone };

  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contacts[index];

  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];

  await writeContacts(newContacts);
  return removedContact;
}

async function updateContact(contactId, updateData) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...updateData };
  await writeContacts(contacts);
  return contacts[index];
}

const contactsService = {
  listContacts,
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
export default contactsService;
