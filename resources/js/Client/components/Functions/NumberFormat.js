const NumberFormat = (number, append = '', prepend = '') => {
    const numberFormatted = append + ' ' + number.toLocaleString("id-ID") + ' ' + prepend;
    return (
        numberFormatted
    );
}

export default NumberFormat;
