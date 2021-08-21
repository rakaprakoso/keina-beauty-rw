const NumberFormat = (number, append = '', prepend = '') => {
    const numberFormatted = append + ' ' + number.toLocaleString("id-ID") + ' ' + prepend;
    return (
        numberFormatted
    );
}

const PercentFormat = (Numerator, Denominator, limit=2) => {
    const percentFormatted = ((parseInt(Denominator)-parseInt(Numerator)) / parseInt(Denominator) * 100).toFixed(limit);
    return (
        percentFormatted + "%"
    )
}

export {NumberFormat, PercentFormat};
