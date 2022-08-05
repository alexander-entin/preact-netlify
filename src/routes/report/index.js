import { Link } from 'preact-router';
import { usePrerenderData } from '@preact/prerender-data-provider';
import { Text } from 'preact-i18n';
import cn from 'classnames';
import Markdown from 'markdown-to-jsx';

import style from './style.scss';
import Container from '../../components/Container';
import Dashboard from '../../components/Dashboard';
import Article from '../../components/Article';
import News from '../../components/News'

export default function Report(props) {
	const [data, isLoading] = usePrerenderData(props);
	if (isLoading) return <div style={{ height: '100%' }} />
	// console.log('Report', props, data)
	const { language, prev, next, news, blog } = data.data;
	return (
		<>
			<Container className={style.container}>
				<div className={style.nav}>
					{prev &&
						<Link className={cn(style.navLink, style.prev)} href={`/${language}/report/${prev}`}>
							<Text id="report.prev">Prev report</Text>
						</Link>
					}
					{next &&
						<Link className={cn(style.navLink, style.next)} href={`/${language}/report/${next}`}>
							<Text id="report.next">Next report</Text>
						</Link>
					}
				</div>
				<Dashboard {...data.data} />
			</Container>
			<Container className={style.digest}>
				<Article>
					<News {...{ news, language }} />
					<Markdown>{blog}</Markdown>
				</Article>
			</Container>
		</>
	);
}
