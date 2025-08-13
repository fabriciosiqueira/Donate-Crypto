import ABI from "./ABI.json"
import Web3 from "web3";

const CONTRACT_ADDRESS = "0x6fe0629311fc25FC676D3D11F8A1535fc1a2e899"

export async function doLogin() {
    if(!window.ethereum) throw new Error("MetaMask não encontrado!")

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if(!accounts || !accounts.length) throw Error("Carteira não encontrado/autorizada")
    
    localStorage.setItem("wallet", accounts[0]) 
    return accounts[0]
}

export async function  getContract() {
    const web3 = new Web3(window.ethereum);
    const from = localStorage.getItem("wallet");
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {from})
}


export async function addCampaign(campaign) {
    console.log({campaign})
    const contract = await getContract()
    return contract.methods.addCampaign(campaign.title, campaign.description, campaign.videoUrl, campaign.imageUrl).send()
}


export async function getLastCampaignId() {
    const contract = await getContract()
    return contract.methods.nextId().call()
}

export async function getCampaignById(id) {
    const contract = await getContract();
    const data = await contract.methods.campaigns(id).call();

    // Converte todos os BigInt para string
    const normalized = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
            key,
            typeof value === "bigint" ? value.toString() : value
        ])
    );

    return normalized;
}


export async function donate(id, donation) {
    await doLogin();
    const contract = await getContract();
    return contract.methods.donate(id).send({
        value: Web3.utils.toWei(donation, "ether")
    })
}


