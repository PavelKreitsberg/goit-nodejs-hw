const fs = require('fs').promises;

const path = require('path');

const contactsPath = path.join(__dirname, "./db/contacts.json")


function listContacts() {
  const data = fs.readFile(contactsPath, 'utf8')
    .then(data => {
      console.table(JSON.parse(data));
    })
    .catch(err => console.log(err))
}

function getContactById(contactId) {
  const data = fs.readFile(contactsPath, 'utf8')
    .then(data => console.log(JSON.parse(data).find(contact => contact.id == contactId)))
    .catch(err => console.log(err))
}

function removeContact(contactId) {
  const data = fs.readFile(contactsPath, 'utf8')
    .then(data => {
      fs.writeFile(contactsPath, JSON.stringify(JSON.parse(data).filter(contact => contact.id != contactId)))
    })
    .catch(err => console.log(err))
}

function addContact(name, email, phone) {
  const newContact = {name, email, phone, id: String(Math.round(Math.random()*1000))}
  const data = fs.readFile(contactsPath, 'utf8')
    .then(data => fs.writeFile(contactsPath, JSON.stringify([...JSON.parse(data), newContact])))
    .catch(err => console.log(err))
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}