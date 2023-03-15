import React from 'react';
import {Line} from "react-chartjs-2";
import {ChartData} from "../types/ChartData";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {ChartLabels} from "../types/ChartLabels";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type ChartProps = {
    chartLabels: ChartLabels;
    buildingType: string;
    chartData: ChartData

}

export const AppChart = ({chartLabels, buildingType, chartData}: ChartProps) => {
    return (chartData && (<>
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
            </>
        )
    );
}

export default AppChart;