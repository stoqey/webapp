
import React from "react";
import PropTypes from "prop-types";
import { MarketDataType } from '@stoqey/client-graphql'
import { format } from "d3-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
	CandlestickSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

interface Props {
	data: MarketDataType[],
	width?: number,
	ratio?: number,
	type?: "svg" | "hybrid"
};
export let CandleStickStockChartWithVolumeBar = (props: Props) => {
	const { type = 'svg', data: initialData, width, ratio } = props;
	const xScaleProvider = discontinuousTimeScaleProvider
		.inputDateAccessor(d => d.date);
	const {
		data,
		xScale,
		xAccessor,
		displayXAccessor,
	} = xScaleProvider(initialData);

	const start = xAccessor(last(data));
	const end = xAccessor(data[Math.max(0, data.length - 100)]);
	const xExtents = [start, end];

	return (
		<ChartCanvas height={600}
			ratio={ratio}
			width={width}
			margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
			type={type}
			seriesName="MSFT"
			data={data}
			xScale={xScale}
			xAccessor={xAccessor}
			displayXAccessor={displayXAccessor}
			xExtents={xExtents}
		>

			<Chart id={1} height={400} yExtents={d => [d.high, d.low]} >
				<YAxis axisAt="right" orient="right" ticks={5} />
				<XAxis axisAt="bottom" orient="bottom" showTicks={false} />
				<CandlestickSeries />
			</Chart>
			<Chart id={2} origin={(w, h) => [0, h - 150]} height={150} yExtents={d => d.volume}>
				<XAxis axisAt="bottom" orient="bottom" />
				<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} />
				<BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "red"} />
			</Chart>
		</ChartCanvas>
	);
}

CandleStickStockChartWithVolumeBar = fitWidth(CandleStickStockChartWithVolumeBar);

export default CandleStickStockChartWithVolumeBar;