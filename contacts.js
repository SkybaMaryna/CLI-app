const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const result = contactsList.find(({ id }) => {
    id === contactId;
  });
  return result || null;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContact = {
    id: new Date().getTime(),
    name,
    email,
    phone,
  };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
