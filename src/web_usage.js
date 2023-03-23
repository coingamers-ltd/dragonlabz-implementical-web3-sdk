import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.5.4.esm.min.js";

export default function Web3Sdk() {

    const getOffChainSignature = async (message) => {

        try {
            if (!window.ethereum)
                throw new Error("No crypto wallet found. Please install it.");

            if(message === null)
                throw new Error("No message to sign.");

            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const signer = provider.getSigner();

            const signature = await signer.signMessage(message);
            const byteArray = new Uint8Array(new TextEncoder().encode(signature.slice(2)));
            const address = await signer.getAddress();

            return {signature, byteArray};
        } catch (err) {
            throw new Error(err.message);
        }
    }

    return {
        getOffChainSignature
    }
}