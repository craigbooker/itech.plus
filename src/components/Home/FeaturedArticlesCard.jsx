import React from 'react';
import styles from '../../css/blog-card.module.css';
import Image from 'gatsby-image';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

const FeaturedArticlesCard = ({ blog }) => {
	const { title, date, author } = blog.frontmatter;
	const slug = blog.fields.slug;
	//console.log(blog.frontmatter);
	const img = blog.frontmatter.cover.childImageSharp.fluid;
	//console.log('BLOGCARD - SLUG: ' + slug + ' ID: ' + id);

	return (
		<article className={styles.blog}>
			<div className={styles.imgContainer}>
				<Image fluid={img} className={styles.img} alt='single post' />
				<AniLink fade className={styles.link} to={`/blog${slug}`}>
					read more
				</AniLink>
			</div>
			<div className={styles.footer}>
				<h4>{title}</h4>
				<h5>{author}</h5>
				<p>{blog.excerpt}</p>
				<p class={styles.readMore}>
					<AniLink fade to={`/blog${slug}`} className={styles.blogCardBtn}>
						read more
					</AniLink>
				</p>
			</div>
		</article>
	);
};

export default FeaturedArticlesCard;
