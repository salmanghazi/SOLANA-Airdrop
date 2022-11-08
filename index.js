const {
  Connection,
  PublicKey,
  Keypair,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} = require('@solana/web3.js');

const wallet = new Keypair();

const { publicKey, secretKey } = wallet._keypair;

const getBalanceInWallet = async () => {
  try {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const balance = await connection.getBalance(new PublicKey(publicKey));
    console.log('Current Balance:', parseFloat(balance / LAMPORTS_PER_SOL), 'SOL');
  } catch (err) {
    console.log(err);
  }
};

const airDropSolana = async () => {
  try {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const { lastValidBlockHeight, blockhash } = await connection.getLatestBlockhash();

    const signature = await connection.requestAirdrop(new PublicKey(publicKey), 2 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    });

  } catch (err) {
    console.log(err.message);
  }
};

const test = async () => {
  await getBalanceInWallet();
  await airDropSolana();
  await getBalanceInWallet();
}

test();