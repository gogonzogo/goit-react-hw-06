import css from './ContactList.module.css';
import ContentEditable from 'react-contenteditable';
import sanitize from 'sanitize-html';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editContact, deleteContact } from 'redux/contactsSlice';
import { sortContactsList, filterContactsList } from 'services/contactListFunc';

export const ContactList = () => {
  const [editableContactId, setEditableContactId] = useState(null);
  const editedContactsRef = useRef({});
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const sortOptions = useSelector(state => state.sortOptions);
  const sortedContacts = sortContactsList(contacts, sortOptions);
  const filteredContacts = filterContactsList(sortedContacts, filter);

  const handleEditClick = id => {
    setEditableContactId(id);
    editedContactsRef.current[id] = {
      ...contacts.find(contact => contact.id === id),
    };
  };

  const handleCancelClick = () => {
    setEditableContactId(null);
    editedContactsRef.current = {};
  };

  const handleSaveClick = id => {
    dispatch(editContact(editedContactsRef.current[id]));
    setEditableContactId(null);
    editedContactsRef.current = {};
  };

  const handleContactChange = (e, id) => {
    const value = e.target.value;
    const dataset = e.currentTarget.dataset.value;
     const sanitizedValue = sanitize(value);
    editedContactsRef.current[id][dataset] = sanitizedValue;
  };

  return (
    <section className={css.contactsListSection}>
      <table className={css.contactsTable}>
        <thead>
          <tr>
            <th colSpan={3}>
              <h1>Contacts</h1>
            </th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length > 0 ? (
            <>
              {filteredContacts.map(contact => (
                <tr key={contact.id}>
                  <td>
                    {' '}
                    {editableContactId === contact.id ? (
                      <ContentEditable
                        className={css.editableContact}
                        html={contact.name}
                        disabled={false}
                        data-value="name"
                        onChange={e => handleContactChange(e, contact.id)}
                      />
                    ) : (
                      contact.name
                    )}
                  </td>
                  <td>
                    {editableContactId === contact.id ? (
                      <ContentEditable
                        className={css.editableContact}
                        html={contact.number}
                        disabled={false}
                        data-value="number"
                        onChange={e => handleContactChange(e, contact.id)}
                      />
                    ) : (
                      contact.number
                    )}
                  </td>
                  <td>
                    {editableContactId === contact.id ? (
                      <>
                        <button
                          className={css.contactItemBtn}
                          onClick={() => handleSaveClick(contact.id)}
                        >
                          Save
                        </button>
                        <button
                          className={css.contactItemBtn}
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={css.contactItemBtn}
                          onClick={() => handleEditClick(contact.id)}
                        >
                          Edit
                        </button>
                        <button
                          className={css.contactItemBtn}
                          onClick={() => dispatch(deleteContact(contact.id))}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={3} className={css.noContacts}>
                No contacts meet search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};
