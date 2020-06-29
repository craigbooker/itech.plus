import React from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import Title from '../Title';
import styles from '../../css/about.module.css';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const getAboutImage = graphql`
	query aboutImage {
		aboutImage: file(relativePath: { eq: "craigbookerSquare.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 600) {
					...GatsbyImageSharpFluid_tracedSVG
				}
			}
		}
	}
`;

const AboutSummary = () => {
	const { aboutImage } = useStaticQuery(getAboutImage);
	return (
		<section className={styles.about}>
			<Title title='about' subtitle='' />
			<div className={styles.aboutCenter}>
				<article className={styles.aboutImg}>
					<div className={styles.imgContainer}>
						<Img
							fluid={aboutImage.childImageSharp.fluid}
							alt='about itech plus'
						/>
					</div>
				</article>
				<article className={styles.aboutInfo}>
					<p>
						My name is Craig Booker. I'm a Writer and Software Developer from
						Oklahoma City, Oklahoma.
					</p>

					<AniLink fade to='/about' className='btn-primary'>
						learn more
					</AniLink>
				</article>
			</div>
		</section>
	);
};

export default AboutSummary;
