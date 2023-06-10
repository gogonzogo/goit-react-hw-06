import { ContactForm } from './ContactForm/ContactForm.jsx';
import { Filter } from './Filter/Filter.jsx';
import { Sort } from './Sort/Sort.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import css from './App.module.css';
import { useSelector } from 'react-redux';

export const App = () => {
  const contacts = useSelector(state => state.contacts);

  return (
    <section className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm />
      {contacts.length >= 2 && (
        <>
          <Filter />
          <Sort />
          <ContactList />
        </>
      )}
      {(contacts.length === 1 && <ContactList />)}
      {contacts.length < 1 && (
        <h5>
          No contacts found. Complete the above form to begin adding contacts.
        </h5>
      )}
    </section>
  );
};

export default App;
