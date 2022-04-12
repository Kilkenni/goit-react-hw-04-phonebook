import { nanoid } from "nanoid";
import { useState } from "react";
import propTypes from "prop-types";
import style from "./ContactForm.module.css"

const INIT_STATE = {
    name: "",
    number: "", //phone
}

export default function ContactForm ({onSubmit}) {
    const [contact, setContact] = useState({...INIT_STATE})
    //state = { ...INIT_STATE };

    function onInputChange(event) {
        const { name, value } = event.currentTarget;
        // const inputValue = event.currentTarget.value;
        setContact({...contact, [name]: value });
    };

    function onFormSubmit(event) {
        event.preventDefault();
        onSubmit({ id: nanoid(), ...contact });
        setContact({ ...INIT_STATE });
    };

    return (
        <form action="submit" className={style.formAddContact} onSubmit={onFormSubmit}>
            <label className={style.formLabel}>Name
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={onInputChange}
                    value={contact.name}
                    className={style.formInput}
                />
            </label>
            
            <label className={style.formLabel}>Phone number
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={onInputChange}
                    value={contact.number}
                    className={style.formInput}
                />
            </label>
            
            <button type="submit" className={style.formBtnSubmit}>Add contact</button>
        </form>
    );
}

ContactForm.propTypes = {
    onSubmit: propTypes.func.isRequired,
}