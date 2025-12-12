import { useWallet } from "@solana/wallet-adapter-react";
import nacl  from "tweetnacl"
import base58 from "bs58";

export function SignMessage() {
    const { publicKey , signMessage } = useWallet();

    async function onClick() {
        if(!publicKey) throw new Error("Wallet not conencted")
        if(!signMessage) throw new Error("Wallet does not supoort signing the message")

        const message = document.getElementById("message").value;
        const enocdedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(enocdedMessage);
        
        if(!nacl.sign.detached.verify(enocdedMessage ,signature, publicKey.toBytes())) throw new Error("Message signature invalid")
        alert(`Success Message Signature: ${base58.encode(signature)}`)
    } ;

    return (
        <div>
             <input id="message" type="text" placeholder="Message" />
               <button onClick={onClick}>
                Sign message
               </button>
        </div>
    )
}