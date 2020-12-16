import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Card.css';
import { formatDate } from '../../utils/helpers';
import { VoteScore } from '../index';

class Card extends PureComponent {
  render() {
    const {
      timestamp, title, body, author, category, voteScore, comments,
      postURL, categoryURL, onUpVote, onDownVote, onDeletePost,
    } = this.props;
    const validComments = comments ? comments.filter(c => !c.deleted) : [];
    const postDateTime = new Date(timestamp);
    return (
      <div className="Card-container">
        <VoteScore score={voteScore} onUpVote={onUpVote} onDownVote={onDownVote} />
        <div>
          <Link to={postURL}><h3>{title}</h3></Link>
          <div className="Card-description">{body}</div>
          <div className="Card-detail">
            Posted by <span className="Card-author">{author}</span> {timestamp ? ` on ${formatDate(postDateTime)}` : ''}
          </div>
          <div className="Card-detail">
            Posted under&nbsp;
            <Link className="Card-link" to={categoryURL}>{category}</Link> |&nbsp;
            <Link className="Card-link" to={postURL}>
              {validComments.length === 1 ? `${validComments.length} comment` : `${validComments.length} comments`}
            </Link>&nbsp;&nbsp;
            <Link className="Card-button" to={postURL}>View Post</Link>
            <button onClick={onDeletePost} className="Card-button">Delete Post</button>
          </div>
        </div>
      </div>
    );
  }
}
Card.propTypes = {
  timestamp: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  voteScore: PropTypes.number,
  comments: PropTypes.array,
  postURL: PropTypes.string,
  categoryURL: PropTypes.string,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  onDeletePost: PropTypes.func,
};

export default Card;
