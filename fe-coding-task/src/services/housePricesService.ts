import {HousePricesData} from "../types/HousePricesData";
import {httpClient} from "../httpClient/httpClient";

type HousePricesRequestData = {
    quarters: Array<string>;
    buildingTypeCode: string;
}

export const fetchHousePricesData = ({
                                         quarters,
                                         buildingTypeCode
                                     }: HousePricesRequestData) => {
    console.log(quarters);
    const body =
        {
            "query": [
                {
                    "code": "Boligtype",
                    "selection": {
                        "filter": "item",
                        "values": [
                            buildingTypeCode
                        ]
                    }
                },
                {
                    "code": "ContentsCode",
                    "selection": {
                        "filter": "item",
                        "values": [
                            "KvPris",
                        ]
                    }
                },
                {
                    "code": "Tid",
                    "selection": {
                        "filter": "item",
                        "values": quarters
                    }
                }
            ],
            "response": {
                "format": "json"
            }
        }
    return httpClient.post('/table/07241', body)
}