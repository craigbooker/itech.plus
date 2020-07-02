const config = {
	siteTitle:
		'ITECH PLUS ||  A site discussing iOS devices and related hardware.', // Site title.
	siteTitleShort: 'ITECH PLUS', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
	siteTitleAlt: 'Craig Booker, writer, author', // Alternative site title for SEO.
	siteLogo: '/images/icons/icon-1024.png', // Logo used for SEO and manifest.
	siteUrl: 'https://itech.plus', // Domain of your website without pathPrefix.
	pathPrefix: '/', // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
	siteDescription:
		'ITECH PLUS || A site discussing iOS devices and related hardware.', // Website description used for RSS feeds/meta description tag.
	siteRss: '/rss.xml', // Path to the RSS file.
	siteRssTitle: 'itech.plus RSS feed', // Title of the RSS feed
	siteFBAppID: '1825356251115265', // FB Application ID for using app insights
	googleAnalyticsID: 'UA-47311644-5', // GA tracking ID.
	disqusShortname: 'craigbooker', // Disqus shortname.
	dateFromFormat: 'YYYY-MM-DD', // Date format used in the frontmatter.
	dateFormat: 'DD/MM/YYYY', // Date format for display.
	postsPerPage: 9, // Amount of posts displayed per listing page.
	seriesPerPage: 6, // Amount of series displayed per listing page.
	userName: 'Craig Booker', // Username to display in the author segment.
	userEmail: 'AdvancedUser@example.com', // Email used for RSS feed's author segment
	userTwitter: '', // Optionally renders "Follow Me" in the UserInfo segment.
	userLocation: 'Oklahoma City, OK', // User location to display in the author segment.
	userAvatar: 'https://api.adorable.io/avatars/150/test.png', // User avatar to display in the author segment.
	userDescription: '', // User description to display in the author segment.
	// Links to social profiles/projects you want to display in the author segment/navigation bar.
	userLinks: [
		{
			label: 'Facebook',
			url: 'https://facebook.com/itechdotplus',
			iconClassName: 'fa fa-facebook',
		},
		{
			label: 'Twitter',
			url: 'https://twitter.com/itechplus',
			iconClassName: 'fa fa-twitter',
		},
		{
			label: 'Email',
			url: 'mailto:arcadiaswx@gmail.com',
			iconClassName: 'fa fa-envelope',
		},
	],
	copyright: 'Booker & Co LLC', // Copyright string for the footer of the website and RSS feed.
	themeColor: '#000000', // Used for setting manifest and progress theme colors.
	backgroundColor: '#000000', // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
	config.pathPrefix = '';
} else {
	// Make sure pathPrefix only contains the first forward slash
	config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/')
	config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/')
	config.siteRss = `/${config.siteRss}`;

module.exports = config;
