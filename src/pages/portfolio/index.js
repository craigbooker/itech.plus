import React from 'react';
import Layout from '../../components/Layout';
import Portfolio from '../../components/Portfolio';

export default class PortfolioIndexPage extends React.Component {
	render() {
		return (
			<Layout>
				<div
					className='full-width-image-container margin-top-0'
					style={{
						backgroundImage: `url('/img/blog-index.jpg')`
					}}
				>
					<h1
						className='has-text-weight-bold is-size-1'
						style={{
							boxShadow:
								'0.5rem 0 0 rgb(0, 186, 187, 0.75), -0.5rem 0 0 rgb(0, 186, 187, 0.75)',
							backgroundColor: 'rgb(0, 186, 187, 0.75)',
							color: 'white',
							padding: '1rem'
						}}
					>
						Portfolio
					</h1>
				</div>
				<section className='section'>
					<div className='container'>
						<div className='content'>
							<Portfolio />
						</div>
					</div>
				</section>
			</Layout>
		);
	}
}
