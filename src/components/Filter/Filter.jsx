import css from './Filter.module.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterContacts } from 'redux/contactsSlice';

export const Filter = () => {
  const [state, setState] = useState({
    input: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterContacts(state.input));
  }, [state.input, dispatch]);

  const onChange = e => {
    setState(prevState => ({
      ...prevState,
      input: e.target.value,
    }));
  };

  return (
    <section className={css.filterSection}>
      <div className={css.filterContainer}>
        <p className={css.filterTitle}>Search contacts by name or number</p>
        <input
          className={css.filterInput}
          type="text"
          onChange={onChange}
          value={state.input}
        ></input>
      </div>
    </section>
  );
};
