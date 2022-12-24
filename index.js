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
      const ContactById = await getContactById(id);
      console.table(ContactById);
      break;

    case "add":
      await addContact(name, email, phone);

      console.log(`Contact ${name} successfully added`);
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
