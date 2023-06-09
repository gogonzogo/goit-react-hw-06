import css from './Sort.module.css';
import PropTypes from 'prop-types';

export const Sort = ({
  title,
  value,
  isChecked,
  margin,
  optionOne,
  optionTwo,
  handleSortChange,
  contacts,
}) => {
  const onChange = event => {
    const value = event.target.dataset.value;
    const checked = event.target.checked;

    handleSortChange(value, checked);
  };

  return (
    <>
      {contacts.length > 1 && (
        <div
          className={css.sortContainer}
          style={margin ? { marginLeft: margin } : null}
        >
          {title && <p className={css.sortTitle}>{title}</p>}
          <div className={css.sortOptionContainer}>
            <p className={css.sortOption}>{optionOne}</p>
            <div className={css.sortWrapper}>
              <label className={css.switch}>
                <input
                  onChange={onChange}
                  data-value={value}
                  checked={isChecked}
                  type="checkbox"
                ></input>
                <span className={css.sliderRound}></span>
              </label>
            </div>
            <p className={css.sortOption}>{optionTwo}</p>
          </div>
        </div>
      )}
    </>
  );
};

Sort.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  margin: PropTypes.string,
  optionOne: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  optionTwo: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  handleSortChange: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};
