import React from 'react';
import styles from '../../css/blog-card.module.css';
import _ from 'lodash';
import Image from 'gatsby-image';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

const CategoriesCard = ({ category }) => {
	//const slug = blog.fields.slug;
	//const slug = `/categories/${_.kebabCase(category)}/`;

	return (
		<p class={styles.readMore}>
			<AniLink fade to={`/categories/${_.kebabCase(category)}/`}>
				{category}
			</AniLink>
		</p>
	);
};

export default CategoriesCard;
