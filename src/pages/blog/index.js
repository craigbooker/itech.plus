import React from 'react';
import Layout from '../../components/Layout';
import BlogRoll from '../../components/BlogRoll';

export default class BlogIndexPage extends React.Component {
	render() {
		return (
			<Layout>
				<div
					className='full-width-image-container margin-top-0'
					style={{
						backgroundImage: `url('/img/helloWorld1.jpg')`
					}}
				>
					<div
						className='index-title-wrap'
						style={{
							display: 'flex',
							height: '150px',
							lineHeight: '1',
							justifyContent: 'space-around',
							alignItems: 'left',
							flexDirection: 'column'
						}}
					>
						<h1 className='has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen'>
							Latest Articles
						</h1>
					</div>
				</div>
				<section className='section'>
					<div className='container'>
						<div className='content'>
							<BlogRoll />
						</div>
					</div>
				</section>
			</Layout>
		);
	}
}
