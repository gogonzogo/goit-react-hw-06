import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { Filter } from './Filter/Filter.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import { Sort } from './Sort/Sort.jsx';
import css from './App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownAZ,
  faArrowDownZA,
} from '@fortawesome/free-solid-svg-icons';
import { ThreeDots } from 'react-loader-spinner';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState({ nameOption: false, methodOption: false });
  const [onMount, setOnMount] = useState(true);

  useEffect(() => {
    setOnMount(false);

    const storedSort = localStorage.getItem('sort');
    const parsedSort = JSON.parse(storedSort);

    if (parsedSort) {
      setSort(parsedSort);
    } else {
      localStorage.setItem(
        'sort',
        JSON.stringify({ nameOption: false, methodOption: false })
      );
    }

    const storedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(storedContacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  const updateContactsFilter = e => {
    if (e) {
      const input = e.target.value;
      setFilter(input);
    } else {
      const normalizedFilter = filter.toLowerCase();

      return contacts.filter(
        contact =>
          contact.name.toLowerCase().includes(normalizedFilter) ||
          contact.number.includes(normalizedFilter)
      );
    }
  };

  const handleSortChange = (value, checked) => {
    setSort(prevState => ({
      ...prevState,
      [value]: checked,
    }));

    localStorage.setItem(
      'sort',
      JSON.stringify({
        ...sort,
        [value]: checked,
      })
    );

    sortContacts();
  };

  const sortContacts = () => {
    const sortInfo = JSON.parse(localStorage.getItem('sort'));
    const { nameOption, methodOption } = sortInfo;
    let sortBy = nameOption ? 'lastName' : 'firstName';
    let sortOrder = methodOption ? 'desc' : 'asc';
    setContacts(prevState => {
      const sortedContacts = [...prevState].sort((a, b) => {
        let nameA;
        let nameB;

        if (sortBy === 'firstName') {
          nameA = a.name.split(' ')[0];
          nameB = b.name.split(' ')[0];
        } else if (sortBy === 'lastName') {
          nameA = a.name.split(' ');
          nameB = b.name.split(' ');
          nameA = nameA[nameA.length - 1];
          nameB = nameB[nameB.length - 1];
        }

        return sortOrder === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });

      localStorage.setItem('contacts', JSON.stringify(sortedContacts));

      return sortedContacts;
    });
  };

  const addContact = newContact => {
    const { name, number } = newContact;

    const existingContact = contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (existingContact) {
      alert(`${name} or ${number} is already in contacts`);
      return;
    }

    const updatedContacts = [...contacts, newContact];
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setContacts(updatedContacts);

    if (contacts.length > 1) {
      sortContacts();
    }
  };

  const deleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  return (
    <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2 className={css.contactsTitle}>Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <Filter
            filter={filter}
            updateContactsFilter={updateContactsFilter}
            contacts={contacts}
          />
          <Sort
            title="Sort contacts by name"
            value="nameOption"
            isChecked={sort.nameOption}
            optionOne="First Name"
            optionTwo="Last Name"
            handleSortChange={handleSortChange}
            contacts={contacts}
          />
          <Sort
            value="methodOption"
            isChecked={sort.methodOption}
            margin="45px"
            optionOne={
              <FontAwesomeIcon
                icon={faArrowDownAZ}
                size="lg"
                style={{ color: '#000000' }}
              />
            }
            optionTwo={
              <FontAwesomeIcon
                icon={faArrowDownZA}
                size="lg"
                style={{ color: '#000000' }}
              />
            }
            handleSortChange={handleSortChange}
            contacts={contacts}
          />
          <ContactList
            contacts={updateContactsFilter()}
            deleteContact={deleteContact}
          />
        </>
      ) : onMount ? (
        <>
          <h5>Locating Contacts</h5>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </>
      ) : (
        <h5>
          No contacts found. Complete the above form to begin adding contacts.
        </h5>
      )}
    </div>
  );
};

export default App;
