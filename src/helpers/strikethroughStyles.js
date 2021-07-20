const getStrikethroughStyles = (winningIndex, gameWinner) => {
  const strikeColor = gameWinner === 'x' ? '#545454' : '#ece9d1';
  switch (winningIndex) {
    case 0:
      return {
        height: '14px',
        width: '100%',
        top: '15%',
        background: strikeColor,
      };
    case 1:
      return {
        height: '14px',
        width: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        background: strikeColor,
      };
    case 2:
      return {
        height: '14px',
        width: '100%',
        top: '85%',
        transform: 'translateY(-85%)',
        background: strikeColor,
      };
    case 3:
      return {
        height: '14px',
        width: '100%',
        left: '-34%',
        transform: 'rotate(90deg)',
        top: '50%',
        background: strikeColor,
      };
    case 4:
      return {
        height: '14px',
        width: '100%',
        left: '-1%',
        transform: 'rotate(90deg)',
        top: '50%',
        background: strikeColor,
      };
    case 5:
      return {
        height: '14px',
        width: '100%',
        top: '50%',
        transform: 'rotate(90deg)',
        left: '33%',
        background: strikeColor,
      };
    case 6:
      return {
        transform: 'rotate(45deg)',
        transformOrigin: 'top left',
        top: '-8px',
        left: '0',
        width: '140%',
        height: '14px',
        background: strikeColor,
      };
    case 7:
      return {
        transform: 'rotate(-45deg)',
        transformOrigin: 'top right',
        top: '-14px',
        right: '0',
        width: '140%',
        height: '14px',
        background: strikeColor,
      };
    default:
      return null;
  }
};

export default getStrikethroughStyles;
