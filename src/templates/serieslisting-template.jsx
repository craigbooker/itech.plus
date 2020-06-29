import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import Layout from '../components/layout';
import AllSeriesListing from '../components/Series/AllSeriesListing';
import Title from '../components/Title';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import styles from '../css/blog.module.css';
import './listing.css';

class SeriesListingTemplate extends React.Component {
	renderPaging() {
		const { currentPageNum, pageCount } = this.props.pageContext;
		const prevPage =
			currentPageNum - 1 === 1
				? '/series'
				: `/series/page/${currentPageNum - 1}/`;
		const nextPage = `/series/page/${currentPageNum + 1}/`;
		const isFirstPage = currentPageNum === 1;
		const isLastPage = currentPageNum === pageCount;

		return (
			<div className={styles.links}>
				{!isFirstPage && (
					<AniLink fade to={prevPage}>
						Previous
					</AniLink>
				)}
				{[...Array(pageCount)].map((_val, index) => {
					const pageNum = index + 1;
					return (
						<AniLink
							fade
							key={`listing-page-${pageNum}`}
							to={pageNum === 1 ? '/series' : `/series/page/${pageNum}/`}
						>
							{pageNum}
						</AniLink>
					);
				})}
				{!isLastPage && (
					<AniLink fade to={nextPage}>
						Next
					</AniLink>
				)}
			</div>
		);
	}

	render() {
		const seriesEdges = this.props.data.series.edges;
		//const { data } = this.props;
		return (
			<Layout>
				<Helmet title={config.siteTitle} />
				<SEO />
				<section className={styles.blog}>
					<Title title='series' subtitle='' />
					<AllSeriesListing seriesEdges={seriesEdges} />

					<section>{this.renderPaging()}</section>
				</section>
			</Layout>
		);
	}
}

export default SeriesListingTemplate;

/* eslint no-undef: "off" */
export const seriesListingQuery = graphql`
	query SeriesListingQuery($skip: Int!, $limit: Int!) {
		series: allMdx(
			filter: { fileAbsolutePath: { regex: "/series/" } }
			sort: { fields: [fields___date], order: DESC }
			limit: $limit
			skip: $skip
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
`;
