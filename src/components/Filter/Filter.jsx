import propTypes from "prop-types";
import styles from "./Filter.module.css";

const Filter = ({ value, onChange }) => {
    return (<label>Filter contacts:
              <input
                type="text"
                name="filter"
                onChange={onChange}
                value={value}
                className={styles.inputFilter}
              />
            </label>);
}

Filter.propTypes = {
    value: propTypes.string,
    onChange: propTypes.func,
}

export default Filter;