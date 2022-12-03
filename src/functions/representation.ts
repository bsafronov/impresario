export function shortBalance(balance: number) {
  if (balance === 0) return 0;

  if (Math.abs(balance) >= 1000000000) {
    return `${(balance / 1000000000).toFixed(2)}KKK`;
  }
  if (Math.abs(balance) >= 1000000) {
    return `${(balance / 1000000).toFixed(2)}KK`;
  }

  if (Math.abs(balance) >= 1000) {
    return `${(balance / 1000).toFixed(2)}K`;
  }

  return balance;
}

export function fullBalance(balance: number) {
  return `$ ${balance.toLocaleString("en-EN")}`;
}
