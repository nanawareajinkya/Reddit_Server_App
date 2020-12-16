import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from '../index';
import  { TIME_ASC, TIME_DESC, SCORE_ASC, SCORE_DESC, sortHelper } from "./util";
import './PostList.css';

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      sortOrder: SCORE_DESC,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.posts !== nextProps.posts) {
      this.setState({ posts: nextProps.posts });
    }
  }

  onSortChange = (e) => {
    this.setState({ sortOrder: e.target.value });
  };

  getSortedPosts() {
    const { posts, sortOrder } = this.state;
    if (!posts) return posts;

    switch(sortOrder) {
      case TIME_ASC:
        return posts.sort((a, b) => sortHelper(a.timestamp, b.timestamp, true));
      case TIME_DESC:
        return posts.sort((a, b) => sortHelper(a.timestamp, b.timestamp, false));
      case SCORE_ASC:
        return posts.sort((a, b) => sortHelper(a.voteScore, b.voteScore, true));
      case SCORE_DESC:
        return posts.sort((a, b) => sortHelper(a.voteScore, b.voteScore, false));
      default:
        return posts;
    }
  }

  render() {
    const { posts } = this.state;
    const { onDeletePost, onUpVote, onDownVote } = this.props;
    const sortedPosts = this.getSortedPosts(posts);

    return (
      <div className="PostList-container">
        <div className="PostList-sort-container">
          <div>
            <span id="sort-by-id"> Sort By: </span>
            <select onChange={this.onSortChange} aria-labelledby="sort-by-id" defaultValue={SCORE_DESC}>
              <option value={TIME_DESC}>Date: Recent First</option>
              <option value={TIME_ASC}>Date: Earliest First</option>
              <option value={SCORE_DESC}>Vote Score: Best First</option>
              <option value={SCORE_ASC}>Vote Score: Worst First</option>
            </select>
          </div>
        </div>
        {
          sortedPosts && sortedPosts.map(post => {
            return (post && !post.deleted &&
              <Card
                key={post.id}
                timestamp={post.timestamp}
                title={post.title}
                body={post.body}
                author={post.author}
                category={post.category}
                voteScore={post.voteScore}
                comments={post.comments}
                postURL={`/${post.category}/${post.id}`}
                categoryURL={`/${post.category}`}
                onDeletePost={() => onDeletePost(post.id)}
                onUpVote={() => onUpVote(post.id)}
                onDownVote={() => onDownVote(post.id)}
              />
            );
          })
        }
      </div>
    );
  }
}
PostList.propTypes = {
  posts: PropTypes.array,
  onDeletePost: PropTypes.func,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
};
PostList.defaultPropTypes = {
  posts: [],
};
export default PostList;
