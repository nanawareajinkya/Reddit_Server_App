import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './CommentCard.css';
import { formatDate } from '../../utils/helpers';

class DisplayComment extends PureComponent {
  render() {
    const { timestamp, body, author, onEdit, onDelete  } = this.props;
    const commentDateTime = new Date(timestamp);
    return (
      <div>
        <div className="CommentCard-description">{body}</div>
        <div className="CommentCard-detail">
          Posted by <span className="bolditalic">{author}</span> {timestamp ? ` on ${formatDate(commentDateTime)}` : ''}
        </div>
        <div className="CommentCard-detail">
          <button onClick={onEdit} className="CommentCard-button">Edit Comment</button>
          <button onClick={onDelete} className="CommentCard-button">Delete Comment</button>
        </div>
      </div>
    );
  }
}
DisplayComment.propTypes = {
  timestamp: PropTypes.number,
  body: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
export default DisplayComment;
