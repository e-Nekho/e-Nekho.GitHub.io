import {useState} from 'react';

export const Language = () => {
    return "ru";
}

export const usePriceType = () => {
    const [{priceFormat, coefficient}, setPriceFormat] = useState({priceFormat: "rub", coefficient: 1});

    const getSymbol = () => {
        switch(priceFormat) {
            case "rub": return "р.";
            case "usd": return "$";
            case "eur": return "€";
            default: return "р.";
        }
    };

    return {
        symbol: getSymbol(),
        coefficient,
        format: priceFormat,
        setPriceFormat
    };
}

export default function Settings() {
    return {

    }
}