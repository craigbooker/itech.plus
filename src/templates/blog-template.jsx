import React from 'react';
import { graphql } from 'gatsby';
import styles from '../css/postTemplate.module.css';
import Layout from '../components/layout';
import Image from 'gatsby-image';
import SEO from '../components/SEO/SEO';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const BlogPostTemplate = ({ data, pageContext }) => {
	const { slug } = pageContext;
	const postNode = data.blog;
	const { title, date, author, cover } = postNode.frontmatter;
	const { body } = postNode;
	const img = cover.childImageSharp.fluid;

	console.log(postNode);
	const post = postNode.frontmatter;
	const prev = pageContext.prev
		? {
				path: `${pageContext.prev.frontmatter.path}`,
				title: pageContext.prev.frontmatter.title,
				excerpt:
					pageContext.prev.frontmatter.description || pageContext.prev.excerpt,
		  }
		: null;

	return (
		<Layout>
			<SEO postPath={slug} postNode={postNode} postSEO />
			<section className={styles.template}>
				<div className={styles.info}>
					<h1>{title}</h1>
					<h4>
						<span>by {author}</span>
					</h4>
				</div>
				<Image fluid={img} />
				<div className={styles.content}>
					<MDXRenderer>{body}</MDXRenderer>
				</div>
				<span>Published on {date}</span>
			</section>
		</Layout>
	);
};

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogBySlug($id: String) {
		blog: mdx(id: { eq: $id }) {
			id
			body
			excerpt
			frontmatter {
				path
				title
				author
				cover {
					childImageSharp {
						fluid {
							...GatsbyImageSharpFluid_withWebp
						}
					}
				}
				date
				category
				tags
			}
			fields {
				slug
				date(formatString: "MMM DD, YYYY", locale: "en")
			}
		}
	}
`;
