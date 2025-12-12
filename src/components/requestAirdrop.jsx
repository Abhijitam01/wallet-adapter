import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export function RequestAirdrop() {
    const { publicKey } = useWallet();
    const { connection } = useConnection();

    async function requestAirdrop() {
        const amount = parseFloat(document.getElementById('amount').value);
        if (!publicKey) {
            alert('Connect a wallet first.');
            return;
        }
        if (!amount || amount <= 0) {
            alert('Enter a valid amount.');
            return;
        }

        await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
        alert(`Airdropped ${amount} SOL to ${publicKey.toBase58()}`);
    }

    return (
        <div>
            <input id="amount" placeholder="Amount to be send " />
            <button onClick={requestAirdrop}>Request Airdrop</button>
        </div>
    );
}