import React from 'react';
import {Line} from "react-chartjs-2";

type ChartProps = {
    chartLabels: Array<string>;
    buildingType: string;
    chartData: any;

}

export const AppChart = ({chartLabels, buildingType, chartData}: ChartProps) => {
    return (chartData && (
            <Line
                datasetIdKey='id'
                data={{
                    labels: chartLabels,
                    datasets: [
                        {
                            label: `${buildingType} - Average price per square meter (NOK)`,
                            data: chartData,
                        },
                    ],
                }}
            />
        )
    );
}

export default AppChart;