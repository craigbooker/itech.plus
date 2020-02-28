import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Features from '../components/Features';
//import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const AppsPageTemplate = ({
	image,
	title,
	heading,
	description,
	intro
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
			<h2
				className='has-text-weight-bold is-size-1'
				style={{
					boxShadow:
						'rgb(0, 186, 187, 0.75) 0.5rem 0px 0px, rgb(0, 186, 187, 0.75) -0.5rem 0px 0px',
					backgroundColor: 'rgb(0, 186, 187, 0.75)',
					color: 'white',
					lineHeight: '1',
					padding: '0.25em'
				}}
			>
				{title}
			</h2>
		</div>
		<section className='section section--gradient'>
			<div className='container'>
				<div className='section'>
					<div className='columns'>
						<div className='column is-7 is-offset-1'>
							<h3 className='has-text-weight-semibold is-size-2'>{heading}</h3>
							<p>{description}</p>
						</div>
					</div>
					<div className='columns'>
						<div className='column is-10 is-offset-1'>
							<Features gridItems={intro.blurbs} />
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
);

AppsPageTemplate.propTypes = {
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	title: PropTypes.string,
	heading: PropTypes.string,
	description: PropTypes.string,
	intro: PropTypes.shape({
		blurbs: PropTypes.array
	})
};

const AppsPage = ({ data }) => {
	const { frontmatter } = data.markdownRemark;

	return (
		<Layout>
			<AppsPageTemplate
				image={frontmatter.image}
				title={frontmatter.title}
				heading={frontmatter.heading}
				description={frontmatter.description}
				intro={frontmatter.intro}
			/>
		</Layout>
	);
};

AppsPage.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.object
		})
	})
};

export default AppsPage;

export const appsPageQuery = graphql`
	query AppsPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			frontmatter {
				title
				image {
					childImageSharp {
						fluid(maxWidth: 2048, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				heading
				description
				intro {
					blurbs {
						image {
							childImageSharp {
								fluid(maxWidth: 240, quality: 64) {
									...GatsbyImageSharpFluid
								}
							}
						}
						text
					}
					heading
					description
				}
			}
		}
	}
`;
