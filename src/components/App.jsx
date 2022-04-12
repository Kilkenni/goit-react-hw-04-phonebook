import {useState, useEffect} from "react";

// import { nanoid } from "nanoid";

import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";

// const DUMMY_CONTACTS = [
//   {id: 'KindLady', name: 'Athene Margoulis', number: '459-12-56'},
//   {id: 'Nucl3arSnake', name: 'Francis Pritchard', number: '443-89-12'},
//   {id: 'FlyGirl', name: 'Faridah Malik', number: '645-17-79'},
//   {id: 'TyphoonMaster', name: 'Vasili Shevchenko', number: '227-91-26'},
// ];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) ?? [];
  });
  const [filter, setFilter] = useState(''); //search filter

  useEffect(() => {
    if (contacts && contacts.length > 0) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
    else { //if no contacts remain, clean localStorage entirely
      localStorage.removeItem("contacts");
    }  
  }, [contacts]);

  const addContact = (newContact) => {
    //check if the person already exists in contacts
    const normalizedNewName = newContact.name.toLowerCase();
    if (contacts.some( (contact) => {
      return contact.name.toLowerCase() === normalizedNewName;
    }) ) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    setContacts((prevContacts) => { return [...prevContacts, newContact] });
  }

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => {
        return contact.id !== contactId;
      });    
    });
  }

  const onFilterChange = (event) => { 
    setFilter(event.currentTarget.value);
  }

  return (
    <div
      style={{
        height: '100vh',
        fontSize: 20,
        color: '#010101',

        paddingLeft: 50,
        paddingRight: 50,
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm
        onSubmit={(newContact) => {addContact(newContact)}}
      />

      <h2>Contacts</h2>

      <Filter
        value={filter}
        onChange={onFilterChange}
      />

      <ContactList
        contacts={contacts}
        filter={filter}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
