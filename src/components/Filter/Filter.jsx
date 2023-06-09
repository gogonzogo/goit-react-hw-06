import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ filter, updateContactsFilter, contacts }) => {
  return (
    <>
      {contacts.length > 1 && (
        <div className={css.filterContainer}>
          <p className={css.filterTitle}>Search contacts by name or number</p>
          <input
            className={css.filterInput}
            type="text"
            onChange={e => updateContactsFilter(e)}
            value={filter}
          ></input>
        </div>
      )}
    </>
  );
};

Filter.propTypes = {
  updateContactsFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  contacts: PropTypes.array.isRequired,
};
