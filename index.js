const {
  addContact,
  removeContact,
  listContacts,
  getContactById,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contactById = await getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);

      console.log(addedContact);
      break;

    case "remove":
      await removeContact(id);
      console.log(`Contact id: ${id} successfully removed`);
      break;

    default:
      console.warn("Unknown action type!");
  }
}

invokeAction(argv);
