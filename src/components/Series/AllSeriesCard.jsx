import React from 'react';
import styles from '../../css/blog-card.module.css';
import Image from 'gatsby-image';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

const AllSeriesCard = ({ series }) => {
	const { title, author } = series.frontmatter;
	const slug = series.fields.slug;
	//console.log(series.frontmatter);
	const img = series.frontmatter.cover.childImageSharp.fluid;
	//console.log('SERIESCARD - SLUG: ' + slug);

	return (
		<article className={styles.blog}>
			<div className={styles.imgContainer}>
				<Image fluid={img} className={styles.img} alt='single post' />
				<AniLink fade className={styles.link} to={`/series${slug}`}>
					read more
				</AniLink>
			</div>
			<div className={styles.footer}>
				<h4>{title}</h4>
				<h5>{author}</h5>
				<p>{series.excerpt}</p>
			</div>
		</article>
	);
};

export default AllSeriesCard;
