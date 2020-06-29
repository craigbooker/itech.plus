import React, { Component } from 'react';
import { Link } from 'gatsby';
import BlogCard from './BlogCard';
import styles from '../../css/blog.module.css';

class BlogListing extends Component {
	render() {
		const { blogEdges } = this.props;
		return (
			<div className={styles.center}>
				{blogEdges.map(({ node }, index) => {
					return <BlogCard key={index} blog={node} />;
				})}
			</div>
		);
	}
}

export default BlogListing;
