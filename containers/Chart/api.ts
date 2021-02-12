import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

// export function getData() {
// 	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
// 		.then(response => response.text())
// 		.then(data => {
// 			const results  = tsvParse(data, parseData(parseDate));
// 			console.log('results', results);
// 			return results;
// 		})
// 	return promiseMSFT;
// }

export function getData() {
	const promiseMSFT = fetch("http://192.168.2.26:3090/v1/query?symbol=STQP&startDate=2021-01-03T12:38:00Z&endDate=2021-01-05T12:38:00Z&range=1m")
		.then(response => response.json())
		.then(data => {
			const results = data.map(d => {
				return {
					...d,
					date: new Date(d.date)
				}
			});
			return results;
		})
	return promiseMSFT;
}

// 
