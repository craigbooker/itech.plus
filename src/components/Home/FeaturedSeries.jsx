import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql, Link } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import FeaturedSeriesCard from '../Home/FeaturedSeriesCard';
import Title from '../Title';
import styles from '../../css/items.module.css';
//import '../../css/listing.css';

class FeaturedSeries extends React.Component {
	render() {
		const { data } = this.props;

		return (
			<section className={styles.featuredSeries}>
				<Title title='articles' subtitle='by series' />
				<div className={styles.center}>
					{data.series.edges.map(({ node }) => {
						return <FeaturedSeriesCard key={node.id} series={node} />;
					})}
					<AniLink fade to='/series' className='btn-primary'>
						read more
					</AniLink>
				</div>
			</section>
		);
	}
}

/* eslint no-undef: "off" */
export default () => (
	<StaticQuery
		query={graphql`
			query FeaturedSeriesQuery {
				series: allMdx(
					filter: { fileAbsolutePath: { regex: "/series/" } }
					sort: { order: DESC, fields: [frontmatter___date] }
					limit: 3
				) {
					edges {
						node {
							id
							fields {
								slug
								date
							}
							excerpt
							timeToRead
							frontmatter {
								title
								tags
								date
								cover {
									childImageSharp {
										fluid {
											...GatsbyImageSharpFluid_withWebp
										}
									}
								}
							}
						}
					}
				}
			}
		`}
		render={(data, count) => <FeaturedSeries data={data} count={count} />}
	/>
);
