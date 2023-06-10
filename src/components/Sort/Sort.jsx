import css from './Sort.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownAZ,
  faArrowDownZA,
} from '@fortawesome/free-solid-svg-icons';
import { sortContacts } from 'redux/contactsSlice';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

export const Sort = () => {
  const [isChecked, setIsChecked] = useState({
    name: false,
    order: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortContacts(isChecked));
  },[isChecked, dispatch])

  const onChange = event => {
    const value = event.target.dataset.value;
    const checked = event.target.checked;

    setIsChecked(prevState => ({
      ...prevState,
      [value]: checked,
    }));
  };

  return (
    <section className={css.sortSection}>
      <div className={css.sortContainer}>
        <p className={css.sortTitle}>Sort contacts by name</p>
        <div className={css.sortOptionContainer}>
          <p className={css.sortOption}>First Name</p>
          <div className={css.sortWrapper}>
            <label className={css.switch}>
              <input
                data-value="name"
                type="checkbox"
                onChange={onChange}
              ></input>
              <span className={css.slider}></span>
            </label>
          </div>
          <p className={css.sortOption}>Last Name</p>
        </div>
        <div className={css.sortOptionContainer} style={{ marginLeft: '61px' }}>
          <FontAwesomeIcon
            icon={faArrowDownAZ}
            size="lg"
            style={{ color: '#4e4e4e' }}
          />
          <div className={css.sortWrapper}>
            <label className={css.switch}>
              <input
                data-value="order"
                type="checkbox"
                onChange={onChange}
              ></input>
              <span className={css.slider}></span>
            </label>
          </div>
          <FontAwesomeIcon
            icon={faArrowDownZA}
            size="lg"
            style={{ color: '#4e4e4e' }}
          />
        </div>
      </div>
    </section>
  );
};
