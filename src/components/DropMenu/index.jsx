import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './DropMenu.scss';

const DropMenu = ({ options, selectedOption, setSelectedOption, type }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropMenuRef = useRef();

  const renderOptions = () => {
    return options.map((option) => (
      <span
        key={option.value}
        data-value={option.value}
        className='drop-menu__option'
        onClick={(e) => handleSelect(e)}
      >
        {option.name}
      </span>
    ));
  };

  const menuClasses = cx({
    'drop-menu': true,
    'drop-menu--open': isMenuOpen,
  });

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelect = (e) => {
    if (selectedOption !== e.target.dataset.value) {
      setSelectedOption(e.target.dataset.value);
    }
  };

  const renderSelected = () => {
    if (type === 'players') {
      return `Best of ${selectedOption}`;
    } else {
      const selectedLevelName = options.find(
        (option) => option.value === Number(selectedOption),
      ).name;
      return selectedLevelName;
    }
  };

  const handleOutsideClick = useCallback(
    (e) => {
      if (dropMenuRef.current.contains(e.target)) {
        return;
      }
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    },
    [isMenuOpen],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className='drop-menu__wrapper' onClick={handleClick} ref={dropMenuRef}>
      <div className={menuClasses}>
        <div className='drop-menu__trigger'>
          <span>{renderSelected()}</span>
          <div className='drop-menu__arrow'></div>
        </div>
        <div className='drop-menu__options'>{renderOptions()}</div>
      </div>
    </div>
  );
};

DropMenu.propTypes = {
  options: PropTypes.array,
  selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSelectedOption: PropTypes.func,
  type: PropTypes.string,
};

export default DropMenu;
