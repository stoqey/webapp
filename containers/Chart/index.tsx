
import React from 'react';
import Chart from './CandleStick';
import { getData } from "./api"
import { TypeChooser } from "react-stockcharts/lib/helper";

// http://localhost:6660/v1/query?symbol=STQ&startDate=2021-01-01T12:38:00Z&endDate=2021-03-20T12:38:00Z&range=1m

function ChartComponent() {

	const [state, setState] = React.useState({ data: []})
	React.useEffect(() => {
		getData().then(data => {
			setState({ data })
		})
	}, [])

	if (!state.data.length) {
		return <div>Loading...</div>
	}
	return (
		<TypeChooser>
			{type => <Chart type={type} data={state.data} />}
		</TypeChooser>
	)

}

export default ChartComponent;