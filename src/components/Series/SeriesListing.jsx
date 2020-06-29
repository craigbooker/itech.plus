import React, { Component } from 'react';
import { Link } from 'gatsby';
import SeriesCard from './SeriesCard';
import styles from '../../css/blog.module.css';

class SeriesListing extends React.Component {
	render() {
		const { seriesEdges } = this.props;
		return (
			<div className={styles.center}>
				{seriesEdges.map(({ node }, index) => {
					return <SeriesCard key={index} series={node} />;
				})}
			</div>
		);
	}
}

export default SeriesListing;
