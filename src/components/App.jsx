import React from "react";

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

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '', //search filter
  }

  componentDidMount() {
    //localStorage.setItem("contacts", JSON.stringify(DUMMY_CONTACTS)); //pre-fill localStorage
    const storedContacts = JSON.parse(localStorage.getItem("contacts"));

    if (storedContacts !== null) {
      this.setState({ contacts: storedContacts }); //restoring state from localStorage
    }
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      if (this.state.contacts && this.state.contacts.length > 0) {
        localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
      }
      else { //if no contacts remain, clean localStorage entirely
        localStorage.removeItem("contacts");
      }    
    } 
  }

  addContact = (newContact) => {
    //check if the person already exists in contacts
    const normalizedNewName = newContact.name.toLowerCase();
    if (this.state.contacts.some( (contact) => {
      return contact.name.toLowerCase() === normalizedNewName;
    }) ) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    this.setState((currentState) => {
      return { contacts: [...currentState.contacts, newContact] };
    });
  }

  deleteContact = (contactId) => {
    this.setState((currentState) => {
      return {
        contacts: currentState.contacts.filter((contact) => {
          return contact.id !== contactId;
        }),
      }
    });
  }

  onInputChange = (event) => {  
    const { name, value } = event.currentTarget;
    // const inputValue = event.currentTarget.value;
    this.setState({ [name]: value });
  }

  render() {
    // const lowCaseFilter = this.state.filter.toLowerCase();

    return (
      <div
        style={{
          height: '100vh',
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          fontSize: 20,
          // textTransform: 'uppercase',
          color: '#010101',

          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={(newContact) => {this.addContact(newContact)}}
        />

        <h2>Contacts</h2>

        <Filter
          value={this.state.filter}
          onChange={this.onInputChange}
        />

        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }

  
};

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         textTransform: 'uppercase',
//         color: '#010101',
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
