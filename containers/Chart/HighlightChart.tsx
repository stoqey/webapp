
import React from 'react';
import AreaChart from './AreaChart';
import { getData } from "./api"

function HighlightChart() {

	const [state, setState] = React.useState({ data: [] })
	React.useEffect(() => {
		getData().then(data => {
			setState({ data })
		})
	}, [])

	if (!state.data.length) {
		return <div>Loading...</div>
	}
	return <AreaChart data={state.data} />


}

export default HighlightChart;