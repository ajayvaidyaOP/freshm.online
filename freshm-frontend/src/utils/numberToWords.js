// Indian-format number to words, e.g. 267930 -> "Two Lakh Sixty Seven Thousand Nine Hundred Thirty"
const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function twoDigits(n) {
  if (n < 20) return ONES[n];
  return (TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : "")).trim();
}

function chunk(n) {
  let out = "";
  const hundred = Math.floor(n / 100);
  const rest = n % 100;
  if (hundred) out += ONES[hundred] + " Hundred ";
  if (rest) out += twoDigits(rest) + " ";
  return out;
}

export function numberToWordsIndian(amount) {
  let n = Math.round(Number(amount) || 0);
  if (n === 0) return "Zero";
  let words = "";
  const crore = Math.floor(n / 10000000); n %= 10000000;
  const lakh = Math.floor(n / 100000);   n %= 100000;
  const thousand = Math.floor(n / 1000);  n %= 1000;
  if (crore) words += chunk(crore) + "Crore ";
  if (lakh) words += chunk(lakh) + "Lakh ";
  if (thousand) words += chunk(thousand) + "Thousand ";
  if (n) words += chunk(n);
  return words.trim();
}

// "INR Two Lakh ... Only."
export function inrInWords(amount) {
  return `INR ${numberToWordsIndian(amount)} Only.`;
}
