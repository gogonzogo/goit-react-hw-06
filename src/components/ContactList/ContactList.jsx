import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { sortContactsList, filterContactsList } from 'services/contactListFunc';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const sortOptions = useSelector(state => state.sortOptions);
  const sortedContacts = sortContactsList(contacts, sortOptions);
  const filteredContacts = filterContactsList(sortedContacts, filter);

  return (
    <section className={css.contactsListSection}>
      <h1>Contacts</h1>
      <ul className={css.contactsList}>
        {filteredContacts.length > 0 ? (
          <>
            {filteredContacts.map(contact => (
              <li className={css.contactItem} key={contact.id}>
                {`${contact.name}`}
                <span
                  className={css.contactItemNumer}
                >{`: ${contact.number}`}</span>
                <button
                  className={css.contactItemDeleteBtn}
                  onClick={() => dispatch(deleteContact(contact.id))}
                >
                  Delete
                </button>
              </li>
            ))}
          </>
        ) : (
          <h5 className={css.noContacts}>No contacts meet search criteria.</h5>
        )}
      </ul>
    </section>
  );
};
