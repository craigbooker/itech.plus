import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql, Link } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import FeaturedArticlesCard from '../Home/FeaturedArticlesCard';
import Title from '../Title';
import config from '../../../data/SiteConfig';
import styles from '../../css/items.module.css';
//import '../../css/listing.css';

class FeaturedArticles extends React.Component {
	render() {
		const { data } = this.props;

		return (
			<section className={styles.featuredArticles}>
				<Title title='latest' subtitle='articles' />
				<div className={styles.center}>
					{data.posts.edges.map(({ node }) => {
						return <FeaturedArticlesCard key={node.id} blog={node} />;
					})}
					<AniLink fade to='/blog' className='btn-primary'>
						read more
					</AniLink>
				</div>
			</section>
		);
	}
}

/* eslint no-undef: "off" */
export default () => (
	<StaticQuery
		query={graphql`
			query FeaturedArticlesQuery {
				posts: allMdx(
					filter: { fileAbsolutePath: { regex: "/posts/" } }
					sort: { order: DESC, fields: [frontmatter___date] }
					limit: 3
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
		`}
		render={(data, count) => <FeaturedArticles data={data} count={count} />}
	/>
);
