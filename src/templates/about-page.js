import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
//import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const AboutPageTemplate = ({
	image,
	title,
	heading,
	subheading,
	mainpitch,
	description
}) => (
	<div className='content'>
		<div
			className='full-width-image-container margin-top-0'
			style={{
				backgroundImage: `url(${
					!!image.childImageSharp ? image.childImageSharp.fluid.src : image
				})`
			}}
		>
			<div
				className='index-title-wrap'
				style={{
					display: 'flex',
					height: '150px',
					lineHeight: '1',
					justifyContent: 'space-around',
					alignItems: 'left',
					flexDirection: 'column'
				}}
			>
				<h1 className='has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen'>
					{title}
				</h1>
				<h2 className='has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen'>
					{subheading}
				</h2>
			</div>
		</div>
		<section className='section section--gradient'>
			<div className='container'>
				<div className='section'>
					<div className='columns'>
						<div className='column is-7 is-offset-1'>
							<div className='content'>
								<div className='content'>
									<h1 className='has-text-weight-semibold is-size-2'>
										{heading}
									</h1>
								</div>
								<div className='columns'>
									<div className='column is-12'>
										<h3 className='content'>{mainpitch.title}</h3>
										<p>{mainpitch.description}</p>
									</div>
									<div className='column is-2'>
										<img
											className='imgStyle'
											src='/img/craig-booker.jpg'
											alt='Craig Booker'
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
);

AboutPageTemplate.propTypes = {
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	title: PropTypes.string,
	heading: PropTypes.string,
	subheading: PropTypes.string,
	mainpitch: PropTypes.object,
	description: PropTypes.string
};

const AboutPage = ({ data }) => {
	const { frontmatter } = data.markdownRemark;

	return (
		<Layout>
			<AboutPageTemplate
				image={frontmatter.image}
				title={frontmatter.title}
				subheading={frontmatter.subheading}
				heading={frontmatter.heading}
				description={frontmatter.description}
				mainpitch={frontmatter.mainpitch}
			/>
		</Layout>
	);
};

AboutPage.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.object
		})
	})
};

export default AboutPage;

export const aboutPageQuery = graphql`
	query AboutPageTemplate {
		markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
			frontmatter {
				title
				subheading
				image {
					childImageSharp {
						fluid(maxWidth: 2048, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				heading
				description
				mainpitch {
					title
					description
				}
			}
		}
	}
`;
