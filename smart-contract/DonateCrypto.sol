// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;


struct Campaign {
    address author;
    string title;
    string description;
    string videoUrl;
    string imageUrl;
    uint256 balance;
    bool active;
}


contract DonateCrypto  {
    address public admin;
    uint256 public fee = 100; // taxa fixa em wei
    uint256 public nextId = 0;

    mapping(uint256 => Campaign) public campaigns;

    constructor() {
        admin = msg.sender; // quem faz o deploy vira dono
    }

    function addCampaign(
        string calldata title,
        string calldata description,
        string calldata videoUrl,
        string calldata imageUrl
    ) public {
        Campaign memory newCampaign;
        newCampaign.title = title;
        newCampaign.description = description;
        newCampaign.videoUrl = videoUrl;
        newCampaign.imageUrl = imageUrl;
        newCampaign.active = true;
        newCampaign.author = msg.sender;

        nextId++;
        campaigns[nextId] = newCampaign;
    }

    function donate(uint256 id) public payable {
        require(msg.value > 0, "You must send a donation > 0");
        require(campaigns[id].active, "Cannot donate to this campaign");

        campaigns[id].balance += msg.value;
    }

    function withdraw(uint256 id) public  {
        Campaign storage campaign = campaigns[id];
        require(campaign.author == msg.sender, "You do not have permission");
        require(campaign.active, "This campaign is closed");
        require(campaign.balance > fee, "This campaign does not have enough balance");

        // Marca como encerrada e zera saldo antes de transferir (padrão Checks-Effects-Interactions)
        campaign.active = false;
        uint256 amount = campaign.balance;
        campaign.balance = 0;

        // 1. Envia a taxa para o admin
        (bool feeSent, ) = payable(admin).call{value: fee}("");
        require(feeSent, "Failed to send fee");

        // 2. Envia o restante para o autor
        uint256 authorAmount = amount - fee;
        (bool sent, ) = payable(campaign.author).call{value: authorAmount}("");
        require(sent, "Failed to send donation");
    }
}
