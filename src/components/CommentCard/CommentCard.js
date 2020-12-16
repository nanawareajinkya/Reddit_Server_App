import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CommentCard.css';
import { VoteScore } from '../index';
import DisplayComment from './DisplayComment';
import EditCommentForm from './EditCommentForm';

class CommentCard extends Component {
  state = {
    showEditForm: false,
  };
  render() {
    const {
      timestamp, body, author, voteScore, onUpVote, onDownVote, onEditComment, onDeleteComment,
    } = this.props;
    const { showEditForm } = this.state;
    return (
      <div className="CommentCard-container">
        <VoteScore score={voteScore} onUpVote={onUpVote} onDownVote={onDownVote} />
        {
          showEditForm ? (
            <EditCommentForm
              initialValues={{ author: author, body: body }}
              onSubmitSuccess={() => this.setState({ showEditForm: false })}
              onSubmit={onEditComment}
            />
          ) : (
            <DisplayComment
              timestamp={timestamp}
              body={body}
              author={author}
              onEdit={() => this.setState({ showEditForm: true })}
              onDelete={onDeleteComment}
            />
          )
        }
      </div>
    );
  }
}
CommentCard.propTypes = {
  timestamp: PropTypes.number,
  body: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  voteScore: PropTypes.number,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  onDeleteComment: PropTypes.func,
  onEditComment: PropTypes.func,
};
export default CommentCard;
