import React, { Component } from 'react';
import { Link } from 'gatsby';
import CategoriesCard from './CategoriesCard';
import styles from '../../css/blog.module.css';

class CategoriesListing extends Component {
	render() {
		const { categorySet } = this.props;
		return (
			<div className={styles.center}>
				{categorySet.map((category, index) => {
					return <CategoriesCard key={index} category={category} />;
				})}
			</div>
		);
	}
}

export default CategoriesListing;
