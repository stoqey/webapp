import React, { useState } from 'react';
import { NextPage } from 'next';
import { GET_MARKETDATA } from '@stoqey/client-graphql'
import { Cell } from 'baseui/layout-grid';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import ApexChart from 'components/UiElements/ApexChart/ApexChart';
import { useApolloClient } from '@apollo/client';
import _get from 'lodash/get';

const StqChart: NextPage<{}> = () => {

    const client = useApolloClient();

    const startDate = new Date("2021-01-02");
    const endDate = new Date();

    const [selection, setSelection] = useState<string>('all');
    const [state, setState] = useState<any>({
        series: [
            {
                data: [],
            },
        ],
        options: {
            chart: {
                type: 'area',
                height: 420,
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            markers: {
                size: 0,
                style: 'hollow',
            },
            xaxis: {
                type: 'datetime',
                min: undefined,
                max: undefined
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy',
                },
            },
            colors: ['gold'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 100],
                },
            },
        },
    });

    React.useEffect(() => {
        const getData = async () => {
            const response = await client.query({
                query: GET_MARKETDATA,
                variables: {
                    symbol: 'STQ',
                    range: '1d',
                    start: startDate,
                    end: endDate,
                    limit: 1000,
                },
                fetchPolicy: "network-only",
            });

            const data = _get(response, 'data.data', []);

            const dataForState = data.map(y => {
                return [new Date(y.date).getTime(), y.close]
            });

            // update series now
            setState({
                ...state,
                series: [
                    {
                        data: dataForState
                    }
                ],
            });
        }
        getData();
    }, [])

    function updateData(timeline: string) {
        setSelection(timeline);

        switch (timeline) {
            case 'one_month':
                setState({
                    ...state,
                    options: {
                        xaxis: {
                            min: new Date(new Date(endDate).setMonth(endDate.getMonth() - 1)).getTime(),
                            max: endDate.getTime(),
                        },
                    },
                });
                break;
            case 'six_months':
                setState({
                    ...state,
                    options: {
                        xaxis: {
                            min: new Date(new Date(endDate).setMonth(endDate.getMonth() - 6)).getTime(),
                            max: endDate.getTime(),
                        },
                    },
                });
                break;
            case 'one_year':
                setState({
                    ...state,
                    options: {
                        xaxis: {
                            min: new Date(new Date(endDate).setMonth(endDate.getMonth() - 12)).getTime(),
                            max: endDate.getTime(),
                        },
                    },
                });
                break;
            case 'ytd':
                setState({
                    ...state,
                    options: {
                        xaxis: {
                            min: new Date(new Date(endDate).setMonth(endDate.getMonth() - 12)).getTime(),
                            max: endDate.getTime(),
                        },
                    },
                });
                break;
            case 'all':
                setState({
                    ...state,
                    options: {
                        xaxis: {
                            min: undefined,
                            max: undefined,
                        },
                    },
                });
                break;
        }
    }

    return (
        <>
            <Cell span={[12, 12, 12]}>
                <Block justifyContent="center" alignContent="center" display="flex" width="100%">
                    <Button
                        onClick={() => updateData('one_month')}
                        kind={selection === 'one_month' ? 'primary' : 'secondary'}
                        size="compact"
                    >
                        1M
								</Button>
                    <Button
                        onClick={() => updateData('six_months')}
                        kind={selection === 'six_months' ? 'primary' : 'secondary'}
                        size="compact"
                    >
                        6M
								</Button>
                    <Button
                        onClick={() => updateData('one_year')}
                        kind={selection === 'one_year' ? 'primary' : 'secondary'}
                        size="compact"
                    >
                        1Y
								</Button>
                    <Button
                        onClick={() => updateData('ytd')}
                        kind={selection === 'ytd' ? 'primary' : 'secondary'}
                        size="compact"
                    >
                        YTD
								</Button>
                    <Button
                        onClick={() => updateData('all')}
                        kind={selection === 'all' ? 'primary' : 'secondary'}
                        size="compact"
                    >
                        ALL
								</Button>
                </Block>
                <Block paddingTop="20px">
                    <ApexChart
                        options={state.options}
                        series={state.series}
                        type="area"
                        height={420}
                    />
                </Block>
            </Cell>

        </>
    );
};

export default StqChart;
