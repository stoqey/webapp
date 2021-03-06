
import React from "react";
import { MarketDataType } from '@stoqey/client-graphql'
import { scaleTime } from "d3-scale";
import { curveMonotoneX } from "d3-shape";

import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";

const canvasGradient = createVerticalLinearGradient([
    { stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
    { stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
    { stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);

interface Props {
    data: MarketDataType[],
    width?: number,
    height?: number,
    ratio?: number,
    type?: "svg" | "hybrid",
}

let AreaChart = (props: Props) => {
    const { data, type = "svg", width = '100%', height = 400, ratio } = props;
    return (
        <ChartCanvas ratio={ratio} width={width} height={height}
            margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
            seriesName="MSFT"
            data={data} type={type}
            xAccessor={d => d.date}
            xScale={scaleTime()}
            xExtents={[data[0].date, data[data.length - 1].date]}
        >
            <Chart id={0} yExtents={d => d.close}>
                <defs>
                    <linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
                        <stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
                        <stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#4286f4" stopOpacity={0.8} />
                    </linearGradient>
                </defs>
                <XAxis axisAt="bottom" orient="bottom" ticks={6} />
                <YAxis axisAt="left" orient="left" />
                <AreaSeries
                    yAccessor={d => d.close}
                    fill="url(#MyGradient)"
                    strokeWidth={2}
                    interpolation={curveMonotoneX}
                    canvasGradient={canvasGradient}
                />
            </Chart>
        </ChartCanvas>
    );
}

AreaChart = fitWidth(AreaChart);

export default AreaChart;