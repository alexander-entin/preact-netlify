import { useState, useEffect, useMemo } from 'preact/hooks';

export default () => {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	const handleResize = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};

	const breakpoints = useMemo(() => {
		if (window) {
			return {
				mobile: getComputedStyle(document.documentElement)
					.getPropertyValue('--mobile-breakpoint').trim(),
				tablet: getComputedStyle(document.documentElement)
					.getPropertyValue('--tablet-breakpoint').trim(),
				desktop: getComputedStyle(document.documentElement)
					.getPropertyValue('--desktop-breakpoint').trim()
			};
		}
	}, []);

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const mobile = useMemo(() => (width ? width <= parseInt(breakpoints.mobile, 10) : false), [breakpoints, width]);
	const tablet = useMemo(
		() => (width ? width <= parseInt(breakpoints.tablet, 10) && width > parseInt(breakpoints.mobile, 10) : false),
		[width, breakpoints]
	);
	const desktop = useMemo(() => (width ? width > parseInt(breakpoints.tablet, 10) : false), [width, breakpoints]);

	return {
		width,
		height,
		mobile,
		tablet,
		desktop
	};
};
