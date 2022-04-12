import ContactItem from "../ContactItem";
import propTypes from "prop-types";
import styles from "./ContactList.module.css"

const ContactList = ({ contacts, filter, onDeleteContact }) => {
    const lowCaseFilter = filter.toLowerCase();
    
    return (
        contacts.length === 0 ?
        <p>No contacts so far...</p> :           
        <ul className={styles.contactList}>
            {contacts.map((contact) => {
                // console.log(`${contact.name.toLowerCase()} includes ${lowCaseFilter}: ${contact.name.toLowerCase().includes(lowCaseFilter)}`);
                return (contact.name.toLowerCase().includes(lowCaseFilter) &&
                    <li key={contact.id} className={styles.contact}>
                        <ContactItem
                            name={contact.name}
                            number={contact.number}
                        />
                        <button
                            type="button"
                            onClick={() => onDeleteContact(contact.id)}
                            className={styles.btnDeleteContact}
                        >Delete contact
                        </button>
                    </li>);         
            })}
        </ul>        
    );
}

ContactList.propTypes = {
    contacts: propTypes.arrayOf(
        propTypes.shape({
            id: propTypes.string.isRequired,
            name: propTypes.string.isRequired,
            number:propTypes.string.isRequired,
        })
    ).isRequired,
    filter: propTypes.string,
    onDeleteContact: propTypes.func.isRequired,
}

export default ContactList;