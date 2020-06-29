import React from 'react';
import { graphql } from 'gatsby';

import Img from 'gatsby-image';
import styled from 'styled-components';

import Helmet from 'react-helmet';

import PageTitle from '../elements/PageTitle';
import config from '../../data/SiteConfig';

import Layout from '../components/layout';
import StyledHero from '../components/StyledHero';
import Banner from '../components/Banner';
import AboutSummary from '../components/Home/AboutSummary';
import FeaturedArticles from '../components/Home/FeaturedArticles';
import FeaturedSeries from '../components/Home/FeaturedSeries';

const HomePage = ({ data }) => {
	return (
		<Layout title='Home'>
			<StyledHero>
				<Banner title='Hello & welcome!' info='' />
			</StyledHero>

			<FeaturedArticles />
			<FeaturedSeries />
		</Layout>
	);
};

export default HomePage;

export const query = graphql`
	query {
		defaultBcg: file(relativePath: { eq: "images/defaultBcg.jpg" }) {
			childImageSharp {
				fluid(quality: 90, maxWidth: 4160) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;
