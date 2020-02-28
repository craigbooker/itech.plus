import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import craigAvatar from '../../static/img/craig-booker.jpg';
import tagsSVG from '../img/fa-tags.svg';

export const BlogPostTemplate = ({
	content,
	contentComponent,
	description,
	image,
	readingtime,
	wordcount,
	slug,
	date,
	tags,
	title,
	frontmatter,
	helmet
}) => {
	const PostContent = contentComponent || Content;

	return (
		<div className='blog-post'>
			{helmet || ''}
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
				<div className='blog-title-wrap'>
					<h1 className='has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen'>
						{title}
					</h1>
					<div className='has-text-centered;'>
						<span id='publish-date'>
							<span aria-labelledby='publish-date' role='img'>
								📅
							</span>{' '}
							Published on {date}
						</span>{' '}
						by Craig Booker{' '}
						<span id='reading-time'>
							<span aria-labelledby='reading-time' role='img'>
								🕑
							</span>{' '}
							{readingtime}
						</span>{' '}
						<span id='wordcount'>
							<span aria-labelledby='wordcount' role='img'>
								🖹
							</span>{' '}
							{wordcount} words
						</span>
					</div>
				</div>
			</div>
			<div className='container content article'>
				<div className='columns'>
					<div className='column is-10 is-offset-1'>
						<article className='article-body column is-8 is-child'>
							<PostContent content={content} />
						</article>
						<aside className='column is-child'>
							<div className='aside-wrap'>
								<div className='author-card--sidebar box'>
									<div className='author-card-image'>
										<img src={craigAvatar} alt='Craig Booker' />
									</div>
									<div className='author-card-desc'>
										<strong>About the Author</strong>
										<p>
											<a href='https://zerotodev.net/about/' rel='me'>
												Craig Booker
											</a>{' '}
											is an iOS Developer and Writer .
										</p>
									</div>
								</div>
								{tags && tags.length ? (
									<div
										className='blog-categories box'
										style={{ marginTop: `2rem` }}
									>
										<h4>Categories</h4>
										<ul className='taglist'>
											{tags.map(tag => (
												<li key={tag + `tag`}>
													<Link to={`/tags/${kebabCase(tag)}/`}>
														<span>
															<object
																type='image/svg+xml'
																aria-label='Post Tag'
																className='social-svg'
																data={tagsSVG}
															/>
														</span>{' '}
														{tag}
													</Link>
												</li>
											))}
										</ul>
									</div>
								) : null}
							</div>
						</aside>
					</div>
				</div>
			</div>
		</div>
	);
};

BlogPostTemplate.propTypes = {
	content: PropTypes.node.isRequired,
	contentComponent: PropTypes.func,
	description: PropTypes.string,
	frontmatter: PropTypes.object,
	title: PropTypes.string,
	date: PropTypes.string,
	helmet: PropTypes.object
};

const BlogPost = ({ data }) => {
	const { markdownRemark: post } = data;

	return (
		<Layout>
			<BlogPostTemplate
				content={post.html}
				contentComponent={HTMLContent}
				date={post.frontmatter.date}
				description={post.frontmatter.description}
				frontmatter={post.frontmatter}
				tags={post.frontmatter.tags}
				title={post.frontmatter.title}
				image={post.frontmatter.image}
				wordcount={post.fields.readingTime.words}
				slug={post.fields.slug}
				readingtime={post.fields.readingTime.text}
				helmet={
					<Helmet titleTemplate='%s | Blog'>
						<title>{`${post.frontmatter.title}`}</title>
						<meta
							name='description'
							content={`${post.frontmatter.description}`}
						/>
						<meta name='og:title' content={`${post.frontmatter.title}`} />
						<meta
							name='og:description'
							content={`${post.frontmatter.description}`}
						/>
					</Helmet>
				}
			/>
		</Layout>
	);
};

BlogPost.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object
	})
};

export default BlogPost;

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		markdownRemark(id: { eq: $id }) {
			id
			html
			fields {
				slug
				readingTime {
					text
					words
				}
			}
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				image {
					publicURL
					childImageSharp {
						fluid(maxWidth: 1280, quality: 75) {
							...GatsbyImageSharpFluid_withWebp
						}
					}
				}
				emoji
				title
				description
				tags
			}
		}
	}
`;
