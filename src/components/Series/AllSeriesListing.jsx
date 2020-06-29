import React, { Component } from 'react';
import { Link } from 'gatsby';
import AllSeriesCard from './AllSeriesCard';
import styles from '../../css/blog.module.css';

class AllSeriesListing extends React.Component {
	render() {
		const { seriesEdges } = this.props;
		return (
			<div className={styles.center}>
				{seriesEdges.map(({ node }, index) => {
					return <AllSeriesCard key={index} series={node} />;
				})}
			</div>
		);
	}
}

export default AllSeriesListing;
