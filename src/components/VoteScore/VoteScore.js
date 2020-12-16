import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import './VoteScore.css';

const ICON_SIZE = 40;

class VoteScore extends PureComponent {
  render() {
    const { score, onUpVote, onDownVote } = this.props;
    return (
      <div className="VoteScore-container">
        <div className="VoteScore-icon" tabIndex="0" onClick={onUpVote}>
          <FaCaretUp size={ICON_SIZE} />
        </div>
        <div className="VoteScore-text">{score}</div>
        <div className="VoteScore-icon" tabIndex="0" onClick={onDownVote}>
          <FaCaretDown size={ICON_SIZE}/>
        </div>
      </div>
    );
  }
}
VoteScore.propTypes = {
  score: PropTypes.number,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
};
export default VoteScore;
