import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import CategoriesListing from '../components/Blog/CategoriesListing';
import Title from '../components/Title';
import SEO from '../components/SEO/SEO';
import StyledHero from '../components/StyledHero';
import Banner from '../components/Banner';
import config from '../../data/SiteConfig';

export default class CategoryTemplate extends React.Component {
	render() {
		const { categorySet } = this.props.pageContext;

		return (
			<Layout>
				<div className='category-container'>
					<Helmet title={`All categories  | ${config.siteTitle}`} />
					<StyledHero>
						<Banner title='categories' info='' />
					</StyledHero>
					<br />
					<br />
					<Title title='categories' subtitle='' />
					<CategoriesListing categorySet={categorySet} />
				</div>
			</Layout>
		);
	}
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query CategoriesPage {
		defaultBcg: file(relativePath: { eq: "images/defaultBcg.jpg" }) {
			childImageSharp {
				fluid(quality: 90, maxWidth: 4160) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;
