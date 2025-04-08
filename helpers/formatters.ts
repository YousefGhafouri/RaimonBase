import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });
export function $dateFormatter(
    date?: string | Date | null | number,
    format?: string
) {
    return date ? moment(date).format(format ? format : 'jYYYY-jM-jD') : '-';
}

export const intlFormat = new Intl.NumberFormat('irr', {
    maximumSignificantDigits: 3,
})

export function $monyFormatter(amount: number | `${number}`) {
    const money = intlFormat.format(Number(amount));

    return `${money} تومان`;
}

