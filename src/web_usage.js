import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.5.4.esm.min.js";

export default function Web3Sdk() {

    const getOffChainSignature = async (tokenIds = []) => {

        try {
            if (!window.ethereum)
                throw new Error("No crypto wallet found. Please install it.");

            if(tokenIds.length === 0)
                throw new Error("No token ids found.");

            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const signer = provider.getSigner();

            let msg = `
            Dear user!
            
            You are about to burn the tokenIDs below:
            ${tokenIds.join(',')}
            Please sign the request.`

            const signature = await signer.signMessage(msg);
            const address = await signer.getAddress();

            return {address, signature};
        } catch (err) {
            throw new Error(err.message);
        }
    }

    return {
        getOffChainSignature
    }
}