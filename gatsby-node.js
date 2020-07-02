/* eslint "no-console": "off" */

const path = require('path');
const _ = require('lodash');
const moment = require('moment');
const siteConfig = require('./data/SiteConfig');

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;
	let slug;
	if (node.internal.type === 'Mdx') {
		const fileNode = getNode(node.parent);
		const parsedFilePath = path.parse(fileNode.relativePath);

		if (
			Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
			Object.prototype.hasOwnProperty.call(node.frontmatter, 'path')
		) {
			slug = `/${_.kebabCase(node.frontmatter.path)}`;
		} else if (
			Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
			Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
		) {
			slug = `/${_.kebabCase(node.frontmatter.title)}`;
		}
		createNodeField({ node, name: 'slug', value: slug });
		if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
			const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
			if (!date.isValid)
				console.warn(`WARNING: Invalid date.`, node.frontmatter);

			createNodeField({
				node,
				name: 'date',
				value: date.toISOString(),
			});
		}
	}
};

// Get a full list of markdown posts
const query = `
		{
			posts: allMdx(
				filter: { fileAbsolutePath: { regex: "/posts/" } }  
				sort: { fields: [fields___date], order: DESC}
			)  {
				edges {
					node {
						id
						fields {
              slug
            }
						frontmatter {
							path
							title
							tags
							category
							series
							date
						}
					}
				}
			}
			
			series: allMdx(
				filter: { fileAbsolutePath: { regex: "/series/" } }  
				sort: { fields: [fields___date], order: DESC}
			)  {
				edges {
					node {
						id
						fields {
							slug
							date
            }
						frontmatter {
							path
							title
							tags
							category
							date
						}
					}
				}
      }
		}
	`;

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const templates = {
		post: path.resolve('./src/templates/blog-template.jsx'),
		series: path.resolve('./src/templates/series.jsx'),
		tag: path.resolve('./src/templates/tag.jsx'),
		category: path.resolve('./src/templates/category.jsx'),
		blogListing: path.resolve('./src/templates/bloglisting-template.jsx'),
		seriesListing: path.resolve('./src/templates/serieslisting-template.jsx'),
		categoriesListing: path.resolve(
			'./src/templates/categorieslisting-template.jsx'
		),
		listing: path.resolve('./src/templates/listing.jsx'),
		landing: path.resolve('./src/templates/landing.jsx'),
	};

	// Individual Item Pages
	// const postPage = path.resolve('./src/templates/blog-template.jsx');
	// const seriesPage = path.resolve('./src/templates/series.jsx');
	// const tagPage = path.resolve('./src/templates/tag.jsx');
	// const categoryPage = path.resolve('./src/templates/category.jsx');

	// List of Items Pages
	// const listingPage = path.resolve('./src/templates/listing.jsx');
	// const blogListingPage = path.resolve(
	// 	'./src/templates/bloglisting-template.jsx'
	// );
	// const seriesListingPage = path.resolve(
	// 	'./src/templates/serieslisting-template.jsx'
	// );
	// const categoriesListingPage = path.resolve(
	// 	'./src/templates/categorieslisting-template.jsx'
	// );

	// const landingPage = path.resolve('./src/templates/landing.jsx');

	// Grab Query
	const response = await graphql(query);

	// Check for errors
	if (response.errors) {
		console.error(response.errors);
		throw new Error(response.errors);
	}

	const tagSet = new Set();
	const categorySet = new Set();
	const seriesSet = new Set();

	const categoryCount = 0;
	const categoryList = [];

	const postsEdges = response.data.posts.edges;
	const seriesEdges = response.data.series.edges;

	// Sort posts
	postsEdges.sort((postA, postB) => {
		const dateA = moment(
			postA.node.frontmatter.date,
			siteConfig.dateFromFormat
		);

		const dateB = moment(
			postB.node.frontmatter.date,
			siteConfig.dateFromFormat
		);

		if (dateA.isBefore(dateB)) return 1;
		if (dateB.isBefore(dateA)) return -1;

		return 0;
	});

	// Sort series
	seriesEdges.sort((seriesA, seriesB) => {
		const dateA = moment(
			seriesA.node.frontmatter.date,
			siteConfig.dateFromFormat
		);

		const dateB = moment(
			seriesB.node.frontmatter.date,
			siteConfig.dateFromFormat
		);

		if (dateA.isBefore(dateB)) return 1;
		if (dateB.isBefore(dateA)) return -1;

		return 0;
	});

	// Paging
	const { postsPerPage, seriesPerPage } = siteConfig;

	// Posts Listing Page
	if (postsPerPage) {
		const pageCount = Math.ceil(postsEdges.length / postsPerPage);

		//postsEdges.forEach(({ node }, index, arr) => {
		Array.from({ length: pageCount }).forEach((_, index, arr) => {
			console.log('Blog Post Edges Count: ' + postsEdges.length);
			console.log('Blog Posts Per Page Count: ' + postsPerPage);
			console.log('Blog PageCount: ' + pageCount);

			createPage({
				path: index === 0 ? `/blog` : `/blog/page/${index + 1}/`,
				component: templates.blogListing,
				context: {
					limit: postsPerPage,
					skip: index * postsPerPage,
					pageCount,
					currentPageNum: index + 1,
				},
			});
		});
	} else {
		// Load the landing page instead
		createPage({
			path: `/`,
			component: templates.landing,
		});
	}

	// Series Listing Page
	if (seriesPerPage) {
		const pageCount = Math.ceil(seriesEdges.length / seriesPerPage);

		//seriesEdges.forEach(({ node }, index, arr) => {
		Array.from({ length: pageCount }).forEach((_, index, arr) => {
			//console.log('Series Post Edges Count: ' + seriesEdges.length);
			//console.log('Series Posts Per Page Count: ' + seriesPerPage);
			//console.log('Series PageCount: ' + pageCount);

			createPage({
				path: index === 0 ? `/series` : `/series/page/${index + 1}/`,
				component: templates.seriesListing,
				context: {
					limit: seriesPerPage,
					skip: index * seriesPerPage,
					pageCount,
					currentPageNum: index + 1,
				},
			});
		});
	} else {
		// Load the landing page instead
		createPage({
			path: `/`,
			component: templates.landing,
		});
	}

	// Create post pages
	postsEdges.forEach((edge, index) => {
		const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
		const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
		const nextEdge = postsEdges[nextID];
		const prevEdge = postsEdges[prevID];

		createPage({
			path: `${edge.node.frontmatter.path}/`,
			component: templates.post,
			context: {
				slug: edge.node.fields.slug,
				id: edge.node.id,
				nexttitle: nextEdge.node.frontmatter.title,
				nextslug: nextEdge.node.fields.slug,
				prevtitle: prevEdge.node.frontmatter.title,
				prevslug: prevEdge.node.fields.slug,
			},
		});

		// Generate a list of tags
		if (edge.node.frontmatter.tags) {
			edge.node.frontmatter.tags.forEach((tag) => {
				tagSet.add(tag);
			});
		}

		// Generate a list of categories
		// Loop through categories array, add new
		// category if it doesn't exist, otherwise
		// increment category count
		if (edge.node.frontmatter.category) {
			categorySet.add(edge.node.frontmatter.category);
			console.log('CatSet Length: ' + categorySet.size);
		}

		// Generate a list of series
		if (edge.node.frontmatter.series && edge.node.frontmatter.series !== 'NA') {
			console.log(edge.node.frontmatter.series);
			seriesSet.add(edge.node.frontmatter.series);
		}

		// Create series pages
		seriesSet.forEach((series) => {
			console.log(series);
			createPage({
				path: `/series/${_.kebabCase(series)}/`,
				component: templates.series,
				context: { series },
			});
		});

		//  Create tag pages
		tagSet.forEach((tag) => {
			createPage({
				path: `/tags/${_.kebabCase(tag)}/`,
				component: templates.tag,
				context: { tag },
			});
		});

		// Create category pages
		categorySet.forEach((category) => {
			createPage({
				path: `/categories/${_.kebabCase(category)}/`,
				component: templates.category,
				context: { category },
			});
		});
	});
	if (categorySet.size > 0) {
		createPage({
			path: `/categories/`,
			component: templates.categoriesListing,
			context: { categorySet },
		});
		console.log('Categories list created');
	} else {
		console.log(
			'No categories list to create. Categoryset Length: ' + categorySet.size
		);
	}
};
