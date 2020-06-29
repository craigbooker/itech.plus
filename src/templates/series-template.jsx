import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostListing from '../components/PostListing/PostListing';
import config from '../../data/SiteConfig';

export default class SeriesPostTemplate extends React.Component {
	render() {
		const { series } = this.props.pageContext;
		const postEdges = this.props.data.allMdx.edges;

		console.log(postEdges);

		return (
			<Layout>
				<section className={styles.template}>
					<Helmet title={`Posts in series "${series}" | ${config.siteTitle}`} />
					<PostListing postEdges={postEdges} />
				</section>
			</Layout>
		);
	}
}

export const pageQuery = graphql`
	query SeriesBySlug($series: String) {
		allMdx(
			sort: { fields: [fields___date], order: DESC }
			filter: { frontmatter: { series: { eq: $series } } }
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
						path
						title
						author
						tags
						series
						category
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
