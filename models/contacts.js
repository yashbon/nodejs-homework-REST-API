const fs = require("fs/promises");

const crypto = require("node:crypto");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function read() {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
}
async function write(data) {
    return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

const listContacts = async () => await read();
// {
//     // Повертає масив контактів.
//     // const data = await fs.readFile(contactsPath, "utf-8");
//     // const contacts = JSON.parse(data);

//     // const contacts = read();

//     // return contacts;
//     return await read();
// };

const getContactById = async (contactId) => {
    // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await read();
    const contactById = contacts.find((contact) => contact.id === contactId);

    return contactById || null; // ? contactById : null;
};

const removeContact = async (contactId) => {
    // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await read();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
        return null; // { message: "Not found" };
    }

    const newContacts = [
        ...contacts.slice(0, index),
        ...contacts.slice(index + 1),
    ];
    write(newContacts);

    return contacts[index]; // { message: "contact deleted" };
};

const addContact = async (body) => {
    const { name, email, phone } = body;
    const contacts = await read();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);
    await write(contacts);

    return newContact;
};

const updateContact = async (contactId, body) => {
    // const cont = await getContactById(contactId);
    // if (!cont) {
    //     return cont;
    // }
    // console.log(cont);

    const contacts = await read();
    const contactIdx = contacts.findIndex(
        (contact) => contact.id === contactId
    );

    if (contactIdx === -1) {
        return null;
    }

    contacts[contactIdx] = { id: contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[contactIdx];
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
