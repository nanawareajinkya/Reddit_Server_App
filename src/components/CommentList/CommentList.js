import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CommentCard, AddCommentForm } from '../index';
import './CommentList.css';

class CommentList extends Component {
  render() {
    const { postId, comments, onEditComment, onDeleteComment, onUpVote, onDownVote, onAddComment } = this.props;
    const validComments = comments ? comments.filter(comment => !comment.deleted && !comment.parentDeleted) : [];
    return (
      <div className="CommentList-container">
        <h4>Comments</h4>
        <div className="CommentList-comments">
          {validComments && validComments.length > 0 ?
            validComments.map(comment => (
              <CommentCard
                key={comment.id}
                timestamp={comment.timestamp}
                body={comment.body}
                author={comment.author}
                voteScore={comment.voteScore}
                onDeleteComment={() => onDeleteComment(comment.id)}
                onUpVote={() => onUpVote(comment.id)}
                onDownVote={() => onDownVote(comment.id)}
                onEditComment={(values) => onEditComment({ ...comment, ...values })}
              >
              </CommentCard>
            )) :
            <div>
              No comments to display!
            </div>
          }
        </div>
        <h4>Add a comment</h4>
        <AddCommentForm
          postId={postId}
          onSubmit={(postId, values) => onAddComment(postId, values)}
        />
      </div>
    );
  }
}
CommentList.propsTypes = {
  postId: PropTypes.string,
  comments: PropTypes.array,
  onEditComment: PropTypes.func,
  onDeleteComment: PropTypes.func,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  onAddComment: PropTypes.func,
};
export default CommentList;
