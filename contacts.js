const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('contacts.json');

async function listContacts() {
  const contactsList = await fs.readFile(contactsPath, 'utf-8');
  console.table(contactsList);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const contactById = contactsList.find(({ id }) => {
    id === contactId;
  });

  if (contactById) {
    console.log(contactById);
  }
  console.log(`Sorry, we can't find contact with ID: ${contactId}`);
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const newContactsList = contactsList.filter(({ id }) => {
    id !== contactId;
  });
  await fs.writeFile(contactsPath, newContactsList);
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContact = {
    id: new Date().getTime(),
    name,
    email,
    phone,
  };
  const newContactsList = contactsList.push(newContact);
  await fs.writeFile(contactsPath, newContactsList);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
