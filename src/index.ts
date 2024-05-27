import 'dotenv/config';

import {
  drawdown,
  getAvailableBalanceForPool,
  getAvailableCreditForPool,
  getCreditRecordForPool,
  makePayment,
  POOL_NAME,
  StellarNetwork,
  StellarWallet
} from '@huma-shan/soroban-sdk';

(async () => {
  const wallet = new StellarWallet(process.env.BORROWER_KEY);
  const poolName = POOL_NAME.Arf;
  const network =
    (process.argv[2] as StellarNetwork) || StellarNetwork.localnet;

  console.log(`Start getAvailableBalanceForPool`);
  const availableBalance = await getAvailableBalanceForPool(
    poolName,
    network,
    wallet
  );
  console.log(`Available balance: ${availableBalance}`);

  console.log(`Start getCreditRecordForPool`);
  const creditRecord = await getCreditRecordForPool(
    poolName,
    network,
    wallet,
    wallet.userInfo.publicKey
  );
  console.log(`Credit record`, creditRecord);

  console.log(`Start getAvailableCreditForPool`);
  const availableCredit = await getAvailableCreditForPool(
    poolName,
    network,
    wallet,
    wallet.userInfo.publicKey
  );
  console.log(`Available credit: ${availableCredit}`);

  console.log(`Start getTotalDue`);
  const totalDue = await getAvailableCreditForPool(
    poolName,
    network,
    wallet,
    wallet.userInfo.publicKey
  );
  console.log(`Total due: ${totalDue}`);

  const drawdownResult = await drawdown(
    poolName,
    network,
    wallet,
    100_0000000n
  );
  drawdownResult.sendTransactionResponse?.hash;
  console.log(
    `Drawdown success. Tx hash: ${drawdownResult.sendTransactionResponse?.hash}`
  );

  const paymentAmount = 100_0000000n;
  const makePaymentResult = await makePayment(
    poolName,
    network,
    wallet,
    paymentAmount,
    true
  );
  console.log(
    `Payment success. Tx hash: ${makePaymentResult.sendTransactionResponse?.hash}`
  );
})();
