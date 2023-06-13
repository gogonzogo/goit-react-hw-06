import css from './Buttons.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

export const Buttons = ({
  editableContactId,
  contactId,
  handleSaveClick,
  handleEditClick,
  handleCancelClick,
}) => {
  
  const dispatch = useDispatch();
  return (
    <>
      {editableContactId === contactId ? (
        <>
          <button
            className={css.contactItemBtn}
            onClick={() => handleSaveClick(contactId)}
          >
            Save
          </button>
          <button className={css.contactItemBtn} onClick={handleCancelClick}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            className={css.contactItemBtn}
            onClick={() => handleEditClick(contactId)}
          >
            Edit
          </button>
          <button
            className={css.contactItemBtn}
            onClick={() => dispatch(deleteContact(contactId))}
          >
            Delete
          </button>
        </>
      )}
    </>
  );
};


