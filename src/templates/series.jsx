import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import styles from '../css/series.module.css';
import PostListing from '../components/PostListing/PostListing';
import SeriesListing from '../components/Series/SeriesListing';
import Title from '../components/Title';
import config from '../../data/SiteConfig';

export default class SeriesTemplate extends React.Component {
	render() {
		const { series } = this.props.pageContext;
		const seriesEdges = this.props.data.allMdx.edges;

		return (
			<Layout>
				<div className='category-container'>
					<Helmet title={`Posts in series "${series}" | ${config.siteTitle}`} />
					<Title title='series' subtitle='' />
					<div className='series-center'>
						<h4>{series}</h4>
					</div>
					<SeriesListing seriesEdges={seriesEdges} />
				</div>
			</Layout>
		);
	}
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query SeriesPage($series: String) {
		allMdx(
			limit: 1000
			sort: { fields: [fields___date], order: DESC }
			filter: {
				fileAbsolutePath: { regex: "/posts/" }
				frontmatter: { series: { eq: $series } }
			}
		) {
			totalCount
			edges {
				node {
					fields {
						slug
						date
					}
					excerpt
					timeToRead
					frontmatter {
						title
						series
						tags
						cover {
							childImageSharp {
								fluid {
									...GatsbyImageSharpFluid_withWebp
								}
							}
						}
						date
					}
				}
			}
		}
	}
`;
