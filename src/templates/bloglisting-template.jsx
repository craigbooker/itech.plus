import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import Layout from '../components/layout';
import BlogListing from '../components/Blog/BlogListing';
import Title from '../components/Title';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import styles from '../css/blog.module.css';
import './listing.css';

class BlogListingTemplate extends React.Component {
	renderPaging() {
		const { currentPageNum, pageCount } = this.props.pageContext;
		const prevPage =
			currentPageNum - 1 === 1 ? '/blog' : `/blog/page/${currentPageNum - 1}/`;
		const nextPage = `/blog/page/${currentPageNum + 1}/`;
		const isFirst = currentPageNum === 1;
		const isLast = currentPageNum === pageCount;

		return (
			<section className={styles.links}>
				{!isFirst && (
					<Link to={prevPage} className={styles.link}>
						Previous
					</Link>
				)}
				{[...Array(pageCount)].map((_val, index) => {
					const pageNum = index + 1;
					return (
						<Link
							key={`listing-page-${pageNum}`}
							to={pageNum === 1 ? '/blog' : `/blog/page/${pageNum}/`}
							className={
								index + 1 === currentPageNum
									? `${styles.link} ${styles.active}`
									: `${styles.link}`
							}
						>
							{pageNum}
						</Link>
					);
				})}
				{!isLast && (
					<Link to={nextPage} className={styles.link}>
						Next
					</Link>
				)}
			</section>
		);
	}

	render() {
		const blogEdges = this.props.data.posts.edges;
		//const { data } = this.props.data.posts;
		return (
			<Layout>
				<Helmet title={config.siteTitle} />
				<SEO />
				<section className={styles.blog}>
					<Title title='Blog' subtitle='' />
					<BlogListing blogEdges={blogEdges} />

					<section>{this.renderPaging()}</section>
				</section>
			</Layout>
		);
	}
}

export default BlogListingTemplate;

/* eslint no-undef: "off" */
export const blogListingQuery = graphql`
	query BlogListingQuery($skip: Int!, $limit: Int!) {
		posts: allMdx(
			filter: { fileAbsolutePath: { regex: "/posts/" } }
			sort: { fields: [fields___date], order: DESC }
			limit: $limit
			skip: $skip
		) {
			edges {
				node {
					id
					fields {
						slug
						date
					}
					excerpt
					timeToRead
					frontmatter {
						title
						tags
						date
						cover {
							childImageSharp {
								fluid {
									...GatsbyImageSharpFluid_withWebp
								}
							}
						}
					}
				}
			}
		}
	}
`;
