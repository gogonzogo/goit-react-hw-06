import css from './ContactForm.module.css';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsSlice';

export const ContactForm = () => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = state;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    dispatch(addContact(newContact));
    setState({ name: '', number: '' });
  };

  const onChange = e => {
    const trimmedValue = e.target.value
      .split(' ')
      .map(str => str.trim())
      .join(' ');
    
    setState(prevState => ({
      ...prevState,
      [e.target.name]: trimmedValue,
    }));
  };

  return (
    <section className={css.formSection}>
      <form className={css.contactForm} onSubmit={handleSubmit}>
        <label className={(css.inputNameLabel, css.inputLabel)}>
          Name
          <input
            className={(css.inputName, css.formInput)}
            onChange={onChange}
            value={state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
          />
        </label>
        <label className={(css.inputNumLabel, css.inputLabel)}>
          Number
          <input
            className={(css.inputNum, css.formInput)}
            onChange={onChange}
            value={state.number}
            type="tel"
            name="number"
            pattern="^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.formBtn} type="submit">
          Add Contact
        </button>
      </form>
    </section>
  );
};
