import React, {useState} from 'react'

// Продукт
export const CalculateSubtotal = (price = 0, quantity = 0) => price * quantity;

export const CalculateDiscount = (subtotal, discountPercentage) => subtotal * (discountPercentage / 100);

export const CalculateProductTotal = (subtotal, discountAmount) => subtotal - discountAmount;

export const CalculateProduct = (price, quantity, discount) => {
    let subtotal = CalculateSubtotal(price, quantity);
    let discountAmount = CalculateDiscount(subtotal, discount);
    let total = CalculateProductTotal(subtotal, discountAmount);

    return {
        subtotal,
        discountAmount,
        total
    };
};

