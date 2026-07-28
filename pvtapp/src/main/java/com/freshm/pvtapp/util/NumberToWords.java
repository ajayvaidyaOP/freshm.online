package com.freshm.pvtapp.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Converts an amount to Indian-format words for invoices, e.g.
 * 324730 -> "Rupees Three Lakh Twenty Four Thousand Seven Hundred Thirty Only.".
 * Handles paise too: 100.50 -> "... One Hundred Rupees and Fifty Paise Only.".
 */
public final class NumberToWords {

    private NumberToWords() { }

    private static final String[] ONES = {
            "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
            "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
            "Seventeen", "Eighteen", "Nineteen"
    };

    private static final String[] TENS = {
            "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    };

    public static String toIndianRupeeWords(Double amount) {
        if (amount == null) amount = 0d;

        BigDecimal bd = BigDecimal.valueOf(amount).setScale(2, RoundingMode.HALF_UP);
        long rupees = bd.longValue();
        int paise = bd.subtract(BigDecimal.valueOf(rupees)).multiply(BigDecimal.valueOf(100)).intValue();

        StringBuilder sb = new StringBuilder("Rupees ");
        if (rupees == 0) {
            sb.append("Zero");
        } else {
            sb.append(convert(rupees).trim());
        }
        if (paise > 0) {
            sb.append(" and ").append(convert(paise).trim()).append(" Paise");
        }
        sb.append(" Only.");
        return sb.toString();
    }

    private static String convert(long n) {
        if (n == 0) return "";
        StringBuilder sb = new StringBuilder();
        long crore = n / 10000000; n %= 10000000;
        long lakh = n / 100000;    n %= 100000;
        long thousand = n / 1000;  n %= 1000;
        long hundred = n / 100;    n %= 100;

        if (crore > 0) sb.append(convert(crore)).append("Crore ");
        if (lakh > 0) sb.append(convert(lakh)).append("Lakh ");
        if (thousand > 0) sb.append(convert(thousand)).append("Thousand ");
        if (hundred > 0) sb.append(ONES[(int) hundred]).append(" Hundred ");
        if (n > 0) {
            if (n < 20) {
                sb.append(ONES[(int) n]).append(" ");
            } else {
                sb.append(TENS[(int) (n / 10)]).append(" ");
                if (n % 10 > 0) sb.append(ONES[(int) (n % 10)]).append(" ");
            }
        }
        return sb.toString();
    }
}
