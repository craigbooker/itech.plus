const urljoin = require('url-join');
const path = require('path');
const config = require('./data/SiteConfig');

module.exports = {
	pathPrefix: config.pathPrefix === '' ? '/' : config.pathPrefix,
	siteMetadata: {
		title: config.siteTitle,
		description: config.siteDescription,
		baseUrl: config.siteUrl,
		siteUrl: urljoin(config.siteUrl, config.pathPrefix),
		rssMetadata: {
			site_url: urljoin(config.siteUrl, config.pathPrefix),
			feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
			title: config.siteTitle,
			description: config.siteDescription,
			image_url: `${urljoin(
				config.siteUrl,
				config.pathPrefix
			)}/logos/logo-512.png`,
			copyright: config.copyright,
		},
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-lodash',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'assets',
				path: `${__dirname}/static/`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'mdPosts',
				path: `${__dirname}/content/`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'posts',
				path: `${__dirname}/content/posts`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'series',
				path: `${__dirname}/content/series`,
			},
		},
		`gatsby-remark-images`,
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				gatsbyRemarkPlugins: [
					{
						resolve: 'gatsby-remark-images',
					},
				],
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-relative-images`,
					},
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 690,
						},
					},
					{
						resolve: 'gatsby-remark-responsive-iframe',
					},
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-autolink-headers',
					'gatsby-remark-prismjs',
				],
			},
		},
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: config.googleAnalyticsID,
			},
		},
		{
			resolve: 'gatsby-plugin-nprogress',
			options: {
				color: config.themeColor,
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-playground',
		'gatsby-plugin-styled-components',
		'gatsby-plugin-transition-link',
		'gatsby-plugin-catch-links',
		'gatsby-plugin-twitter',
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: config.siteTitle,
				short_name: config.siteTitleShort,
				description: config.siteDescription,
				start_url: config.pathPrefix,
				background_color: config.backgroundColor,
				theme_color: config.themeColor,
				display: 'minimal-ui',
				icons: [
					{
						src: '/logos/logo-192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/logos/logo-512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		},
		'gatsby-plugin-offline',
		{
			resolve: 'gatsby-plugin-feed-mdx',
			options: {
				query: `
        {
          site {
            siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
            }
          }
        }
      `,
				feeds: [
					{
						serialize: ({ query: { site, allMdx } }) => {
							return allMdx.edges.map((edge) => {
								return Object.assign({}, edge.node.frontmatter, {
									description: edge.node.excerpt,
									date: edge.node.frontmatter.date,
									url:
										site.siteMetadata.site_url +
										'/blog' +
										edge.node.fields.slug,
									guid:
										site.siteMetadata.siteUrl + '/blog' + edge.node.fields.slug,
									custom_elements: [{ 'content:encoded': edge.node.html }],
								});
							});
						},
						query: `
            {
              allMdx(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    id
                    excerpt
                    html
                    timeToRead
                    fields {
                      slug
                      date
                    }
                    frontmatter {
                      title
                      tags
                      date
                      category
                      tags
                    }
                  }
                }
              }
            }
          `,
						output: config.siteRss,
						title: config.siteRssTitle,
						match: '^/blog/',
					},
				],
			},
		},
	],
};
