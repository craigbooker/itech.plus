import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import FeaturedPosts from '../components/FeaturedPosts';

export const IndexPageTemplate = ({
	image,
	title,
	heading,
	subheading,
	mainpitch,
	description
}) => (
	<div>
		<div
			className='full-width-image margin-top-0'
			style={{
				backgroundImage: `url(${
					!!image.childImageSharp ? image.childImageSharp.fluid.src : image
				})`,
				backgroundPosition: `top left`,
				backgroundAttachment: `fixed`
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
						<div className='column is-10 is-offset-1'>
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
								<div className='column is-12'>
									<h3 className='has-text-weight-semibold is-size-2'>
										Recent Articles
									</h3>
									<FeaturedPosts />
									<div className='column is-12 has-text-centered'>
										<Link className='btn' to='/blog'>
											Read more
										</Link>
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

IndexPageTemplate.propTypes = {
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	title: PropTypes.string,
	heading: PropTypes.string,
	subheading: PropTypes.string,
	mainpitch: PropTypes.object,
	description: PropTypes.string
};

const IndexPage = ({ data }) => {
	const { frontmatter } = data.markdownRemark;

	return (
		<Layout>
			<IndexPageTemplate
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

IndexPage.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.object
		})
	})
};

export default IndexPage;

export const pageQuery = graphql`
	query IndexPageTemplate {
		markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
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
