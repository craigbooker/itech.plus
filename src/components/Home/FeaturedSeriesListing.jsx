import React, { Component } from 'react';
import { Link } from 'gatsby';
import BlogCard from '../Blog/BlogCard';
import FeaturedSeriedCard from './FeaturedSeriesCard';
import styles from '../../css/blog.module.css';

class FeaturedSeriesListing extends React.Component {
	render() {
		const { seriesEdges } = this.props;
		return (
			<div className={styles.center}>
				{seriesEdges.map(({ node }, index) => {
					return <FeaturedSeriesCard key={index} series={node} />;
				})}
			</div>
		);
	}
}

export default FeaturedSeriesListing;
