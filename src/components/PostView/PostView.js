import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils/helpers';
import { VoteScore } from '../index';
import { Link } from 'react-router-dom';
import './PostView.css';

class PostView extends Component {
  render() {
    const {
      timestamp, title, body, author, category, voteScore, onUpVote, onDownVote,
      postEditURL, categoryURL, onDeletePost,
    } = this.props;
    const postDateTime = new Date(timestamp);
    return (
      <div className="PostView-container">
        <div>
          <VoteScore score={voteScore} onUpVote={onUpVote} onDownVote={onDownVote} />
          <div className="PostView-header">
            <Link to={postEditURL}><h3 className="Post-title">{title}</h3></Link>
            <div className="PostView-detail">
              Posted by <span className="PostView-author">{author}</span> {timestamp ? ` on ${formatDate(postDateTime)}` : ''}
            </div>
            <div className="PostView-detail">
              Posted under&nbsp;
              <Link className="PostView-link" to={categoryURL}>{category}</Link>&nbsp;&nbsp;
              <Link className="PostView-button" to={postEditURL}>Edit Post</Link>
              <button onClick={onDeletePost} className="PostView-button">Delete Post</button>
            </div>
          </div>
        </div>
        <div className="PostView-description">{body}</div>
      </div>
    )
  }
}
PostView.propTypes = {
  timestamp: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  voteScore: PropTypes.number,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  postEditURL: PropTypes.string,
  categoryURL: PropTypes.string,
  onDeletePost: PropTypes.func,

};
export default PostView;
