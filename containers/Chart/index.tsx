
import React from 'react';
import Chart from './CandleStick';
import { getData } from "./api"
import { TypeChooser } from "react-stockcharts/lib/helper";

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