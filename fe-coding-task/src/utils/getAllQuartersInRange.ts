type Range = {
    startingQuarter: number
    endingQuarter: number
    startingYear: number
    endingYear: number
}
export const getAllQuartersInRange = ({
                                          startingQuarter,
                                          endingQuarter,
                                          startingYear,
                                          endingYear
                                      }: Range) => {
    const quarters = [];
    let quarter = startingQuarter;
    let year = startingYear;
    while (year !== endingYear || quarter !== endingQuarter) {
        quarters.push(`${year}K${quarter}`)
        if (quarter === 4) {
            quarter = 1;
            year++;
        } else {
            quarter++
        }
    }
    quarters.push(`${year}K${quarter}`)
    return quarters;
}