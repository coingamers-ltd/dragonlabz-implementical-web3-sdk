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

    const getPermitSignatureERC20 = async (signer, tokens, spender, value, deadline) => {
        const signerAddress = await signer.getAddress();
        const [nonce, name, version, chainId] = await Promise.all([
            tokens.nonces(signerAddress),
            tokens.name(),
            "1",
            signer.getChainId(),
        ])

        return await signer._signTypedData(
            {
                name,
                version,
                chainId,
                verifyingContract: tokens.address,
            },
            {
                Permit: [
                    {
                        name: "owner",
                        type: "address",
                    },
                    {
                        name: "spender",
                        type: "address",
                    },
                    {
                        name: "value",
                        type: "uint256",
                    },
                    {
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        name: "deadline",
                        type: "uint256",
                    },
                ],
            },
            {
                owner: signer.address,
                spender,
                value,
                nonce,
                deadline,
            }
        )
    }

    const getPermitSignatureERC721 = async (signer, nft, spender, tokenId, deadline) => {
        const signerAddress = await signer.getAddress();
        const [nonce, name, version, chainId] = await Promise.all([
            nft.nonces(signerAddress),
            nft.name(),
            "1",
            signer.getChainId(),
        ])

        return await signer._signTypedData(
            {
                name,
                version,
                chainId,
                verifyingContract: nft.address,
            },
            {
                Permit: [
                    {
                        name: "spender",
                        type: "address",
                    },
                    {
                        name: "tokenId",
                        type: "uint256",
                    },
                    {
                        name: "nonce",
                        type: "uint256",
                    },
                    {
                        name: "deadline",
                        type: "uint256",
                    },
                ],
            },
            {
                spender,
                tokenId,
                nonce,
                deadline,
            }
        )
    }

    return {
        getOffChainSignature,
        getPermitSignatureERC20,
        getPermitSignatureERC721
    }
}