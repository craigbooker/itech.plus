import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import PostListing from '../components/PostListing/PostListing';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import StyledHero from '../components/StyledHero';
import Banner from '../components/Banner';

class Landing extends React.Component {
	render() {
		const postEdges = this.props.data.allMarkdownRemark.edges;
		return (
			<Layout>
				<Helmet title={config.siteTitle} />
				<SEO />
				<StyledHero>
					<Banner title='Home' info='' />
				</StyledHero>
				<PostListing postEdges={postEdges} />
			</Layout>
		);
	}
}

export default Landing;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query LandingQuery {
		allMdx(sort: { fields: [fields___date], order: DESC }) {
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
