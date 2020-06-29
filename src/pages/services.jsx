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
import AboutHeader from '../components/About/AboutHeader';
import ServicesList from '../components/Services/ServicesList';

const ServicesPage = ({ data }) => {
	return (
		<Layout title='Services'>
			<StyledHero>
				<Banner title='services' info='' />
			</StyledHero>

			<ServicesList />
		</Layout>
	);
};

export default ServicesPage;

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
