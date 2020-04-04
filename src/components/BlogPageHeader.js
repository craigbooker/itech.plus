import React from 'react';
import PropTypes from 'prop-types';

const BlogPageHeader = ({ title, image, readingtime, date }) => {
	return (
		<div
			className='full-width-image margin-top-0'
			style={{
				backgroundImage: `url(${
					!!image.childImageSharp ? image.childImageSharp.fluid.src : image
				})`,
				backgroundPosition: `top left`,
				backgroundAttachment: `fixed`
			}}
		>
			<div className='blog-title-wrap'>
				<h1 className='has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen'>
					{title}
				</h1>
				<div className='has-text-centered;'>
					<span id='publish-date'>Published: {date}</span> by Craig Booker{' '}
					<span id='reading-time'>
						<span aria-labelledby='reading-time' role='img'>
							🕑
						</span>{' '}
						{readingtime}
					</span>{' '}
				</div>
			</div>
		</div>
	);
};

BlogPageHeader.propTypes = {
	title: PropTypes.string,
	date: PropTypes.string,
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	readingtime: PropTypes.string
};

export default BlogPageHeader;
