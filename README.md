
# Wallet Agent: Get insights from top trader's wallet behaviour
This project aims to revolutionize trading by leveraging artificial intelligence to analyze the behavior of top traders on the MODE Blockchain. The AI-based system will fetch real-time transaction data from the blockchain, focusing on the wallets of successful and high-performing traders. By analyzing transaction logs and wallet activity, the AI will gain insights into trading strategies, patterns, and decision-making processes, which will then be shared with users to help them improve their own trading skills.

The AI agent will provide personalized trading guidance by offering actionable insights based on the analysis of top traders' behaviors. Additionally, it will display wallet addresses of successful traders, allowing users to explore and learn from their strategies. By continuously learning from transaction logs, the AI can adapt and enhance its recommendations over time, offering increasingly accurate and effective trading advice.

# System Architecture
![Sysdiagram](https://github.com/user-attachments/assets/70804423-3b83-40c2-b3b0-07ec5c30ed53)


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



## Usage

Run the following command from the /mode directory:

```
npx ts-node index.ts
```


## License
This project is licensed under the MIT License.
