import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <div className={css.contactsListContainer}>
      <ul className={css.contactsList}>
        {contacts.length > 0 ? (
          <>
            {contacts.map(contact => (
              <li className={css.contactItem} key={contact.id}>
                {`${contact.name}: `}
                <span className={css.contactItemNumer}>{contact.number}</span>
                <button
                  className={css.contactItemDeleteBtn}
                  onClick={() => deleteContact(contact.id)}
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
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
