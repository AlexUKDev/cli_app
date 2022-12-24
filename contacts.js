const { nanoid } = require("nanoid");

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

async function readContacts(path) {
  return JSON.parse(await fs.readFile(path));
}

async function writeContacts(contactArr) {
  await fs.writeFile(contactsPath, JSON.stringify(contactArr, null, 2));
}

async function listContacts() {
  try {
    return await readContacts(contactsPath);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readContacts(contactsPath);
    return contacts.filter(({ id }) => id === contactId);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readContacts(contactsPath);
    const updatedContacts = contacts.filter(({ id }) => id !== contactId);
    await writeContacts(updatedContacts);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  const id = nanoid();

  const newContact = {
    id,
    name,
    email,
    phone,
  };

  try {
    const contacts = await readContacts(contactsPath);
    contacts.push(newContact);
    await writeContacts(contacts);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
