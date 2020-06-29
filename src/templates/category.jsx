import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import CategoryListing from '../components/Blog/CategoryListing';
import Title from '../components/Title';
import SEO from '../components/SEO/SEO';
import StyledHero from '../components/StyledHero';
import Banner from '../components/Banner';
import config from '../../data/SiteConfig';

export default class CategoryTemplate extends React.Component {
	render() {
		const { category } = this.props.pageContext;
		const postEdges = this.props.data.allMdx.edges;
		return (
			<Layout>
				<div className='category-container'>
					<Helmet
						title={`Posts in category "${category}" | ${config.siteTitle}`}
					/>
					<StyledHero>
						<Banner title='category' info={category} />
					</StyledHero>
					<br />
					<br />
					<Title title={category} subtitle='' />
					<CategoryListing postEdges={postEdges} />
				</div>
			</Layout>
		);
	}
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query CategoryPage($category: String) {
		allMdx(
			limit: 1000
			sort: { fields: [fields___date], order: DESC }
			filter: { frontmatter: { category: { eq: $category } } }
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
		defaultBcg: file(relativePath: { eq: "images/defaultBcg.jpg" }) {
			childImageSharp {
				fluid(quality: 90, maxWidth: 4160) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;
