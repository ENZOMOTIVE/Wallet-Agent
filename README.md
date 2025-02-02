# Vercel AI with Mode Example

## Setup

Copy the `.env.template` and populate with your values.

```
cp .env.template .env
```

## Usage

Run the following command from the /mode directory:

```
npx ts-node index.ts
```
# Blockchain and Cryptocurrency Agent

This project provides an agent that offers a variety of functionalities for interacting with blockchain networks, specifically Ethereum and ERC20 token transactions. The agent includes wallet management, transaction operations, token swapping, liquidity management, data analytics, and the ability to post updates to Twitter.

## Features

### 1. **Wallet Management**
   - **Get Wallet Address**: Retrieve the address of the wallet.
   - **Get Chain Information**: Retrieve the chain information of the wallet.
   - **Get Wallet Balance**: Retrieve the balance of ETH in the wallet.

### 2. **Transaction Operations**
   - **Send ETH**: Send ETH to a specified address.
   - **Transfer ERC20 Tokens**: Transfer ERC20 tokens to other addresses.
   - **Approve Token Allowance**: Approve an amount of ERC20 token to another address.
   - **Revoke Token Allowance**: Revoke approval for a specific ERC20 token.

### 3. **Token Information**
   - **Get ERC20 Token Info**: Get detailed information about ERC20 tokens.
   - **Get Token Balance**: Retrieve the balance of an ERC20 token.
   - **Get Token Total Supply**: Retrieve the total supply of a specific ERC20 token.

### 4. **Token Swapping**
   - **Swap Tokens (Single Hop)**: Swap tokens in a single hop with exact input/output specification.
   - **Swap Tokens (Multi-Hop)**: Swap tokens through multiple hops.

### 5. **Liquidity Management**
   - **Mint Liquidity Position**: Mint a new liquidity position in a pool.
   - **Increase Liquidity**: Increase liquidity in an existing position.
   - **Decrease Liquidity**: Decrease liquidity in an existing position.
   - **Collect Tokens**: Collect all available tokens from a liquidity position.
   - **Burn Liquidity Position NFT**: Burn a liquidity position NFT after all tokens have been collected.

### 6. **Data Analytics**
   - **Top Wallets by Transaction Count**: Get the top 5 wallet addresses with the most transactions.

### 7. **Twitter Integration**
   - **Post Updates to Twitter**: Ability to post updates related to blockchain activities directly to Twitter.

## License
This project is licensed under the MIT License.
