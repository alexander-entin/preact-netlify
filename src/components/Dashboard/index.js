import { Text } from 'preact-i18n'
import cn from 'classnames'
import style from './style.scss';
import IconCell from './IconCell';
import DataCell from './DataCell';
import Container from '../Container';

const approximateNumber = n => (
	parseFloat(n)
	? '>\xA0' + (Math.floor(parseFloat(n) / 1e3) * 1e3).toLocaleString()
	: n
)

const Dashboard = (props) => {
	// console.log('Dashboard', props)
	let { from, till, data } = props
	from = new Date(from).toDateString()
	till = new Date(till).toDateString()
	return (
		<Container className={style.container}>
			<h1 className={style.heading}>
				<Text id="report.title" fields={{ till }}>
					Heavy weapons committed to Ukraine as of {till}
				</Text>
			<span className={style.subHeading}>
				<Text id="report.subtitle" fields={{ from }}>
					(and changes since {from})
				</Text>
			</span>
			</h1>
			<div className={style.table}>
				<div className={style.head} />
				<div className={style.head}>
					<Text id="report.usa">USA</Text>
				</div>
				<div className={style.head}>
					<Text id="report.rest">Others</Text>
				</div>
				<div className={cn(style.head, style.russia)}>
					<Text id="report.russia">Russia had</Text>
				</div>

				{data.map(({ category, values: [usa, rest, russia] }) => (
					<div className={style.row}>
						<IconCell category={category} />
						<DataCell className={style.valueCell} {...usa} key={`${category}-USA`} />
						<DataCell className={style.valueCell} {...rest} key={`${category}-rest`} />
						<DataCell className={cn(style.valueCell, style.russia)} {...{ value: approximateNumber(russia.value) }} key={`${category}-russia`} />
					</div>
				))}
			</div>
		</Container>
	)
}

export default Dashboard;