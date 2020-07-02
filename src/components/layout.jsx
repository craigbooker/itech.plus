import React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import config from '../../data/SiteConfig';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import '../css/index.css';

export default class MainLayout extends React.Component {
	render() {
		const { children } = this.props;
		return (
			<>
				<Helmet>
					<html lang='en' />
					<meta name='description' content={config.siteDescription} />
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href={`${withPrefix('/')}images/icon/apple-touch-icon.png`}
					/>
					<link
						rel='icon'
						type='image/png'
						href={`${withPrefix('/')}images/icon/icon-32.png`}
						sizes='32x32'
					/>
					<link
						rel='icon'
						type='image/png'
						href={`${withPrefix('/')}images/icon/icon-16.png`}
						sizes='16x16'
					/>
					<link
						rel='mask-icon'
						href={`${withPrefix('/')}images/icon/safari-pinned-tab.svg`}
						color='#000000'
					/>
				</Helmet>
				<main>
					<Navbar />
					{children}
					<Footer />
				</main>
			</>
		);
	}
}
