import React, { Component } from 'react';
import { Link } from 'gatsby';
import CategoryCard from './CategoryCard';
import styles from '../../css/blog.module.css';

class CategoryListing extends Component {
	render() {
		const { postEdges } = this.props;
		return (
			<div className={styles.center}>
				{postEdges.map(({ node }, index) => {
					return <CategoryCard key={index} blog={node} />;
				})}
			</div>
		);
	}
}

export default CategoryListing;
