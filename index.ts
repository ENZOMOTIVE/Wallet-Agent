import readline from "node:readline";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { http, createPublicClient, parseAbiItem } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mode } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { MODE, USDC, erc20 } from "@goat-sdk/plugin-erc20";
import { kim } from "@goat-sdk/plugin-kim";
import { sendETH } from "@goat-sdk/wallet-evm";
import { viem } from "@goat-sdk/wallet-viem";
import { TwitterApi } from 'twitter-api-v2';

require("dotenv").config();

const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY || '',
    appSecret: process.env.TWITTER_API_SECRET || '',
    accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
    accessSecret: process.env.TWITTER_ACCESS_SECRET || '',
} as {
    appKey: string;
    appSecret: string;
    accessToken: string;
    accessSecret: string;
});


const rwClient = twitterClient.readWrite;

async function postTweet(tweetText: string) {
    try {
        const tweet = await rwClient.v2.tweet(tweetText);
        console.log('Tweet posted successfully:', tweet.data.text);
        return tweet;
    } catch (error) {
        console.error('Error posting tweet:', error);
        throw error;
    }
}



// MODE Token Transfer event signature
const transferEventSignature = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)');

// Replace with actual MODE token contract address
const MODE_TOKEN_ADDRESS = process.env.MODE_TOKEN_ADDRESS;

let privateKey = process.env.WALLET_PRIVATE_KEY || "";

if (!privateKey) {
    throw new Error("WALLET_PRIVATE_KEY environment variable is required");
}

privateKey = privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`;

const account = privateKeyToAccount(privateKey as `0x${string}`);

// Create public client for reading blockchain data
const publicClient = createPublicClient({
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: mode,
});

const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: mode,
});

// Function to fetch and analyze MODE token transactions
async function analyzeTokenTransactions() {
    try {
        // Fetch transfer events
        const transferEvents = await publicClient.getLogs({
            address: MODE_TOKEN_ADDRESS as `0x${string}`,
            event: transferEventSignature,
            fromBlock: 0n,
            toBlock: 'latest'
        });

        // Process transactions
        const addressTransactionCount = new Map<string, number>();

        transferEvents.forEach(event => {
            // Using proper type casting for viem logs
            const topics = event.topics;
            if (topics.length >= 3) {
                // Extract addresses from indexed parameters (topics[1] is 'from', topics[2] is 'to')
                const from = topics[1].slice(26).toLowerCase() as `0x${string}`;
                const to = topics[2].slice(26).toLowerCase() as `0x${string}`;

                addressTransactionCount.set(from, (addressTransactionCount.get(from) || 0) + 1);
                addressTransactionCount.set(to, (addressTransactionCount.get(to) || 0) + 1);
            }
        });

        // Sort addresses by transaction count
        const sortedAddresses = Array.from(addressTransactionCount.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        return {
            totalTransactions: transferEvents.length,
            topAddresses: sortedAddresses.map(([address, count]) => ({
                address,
                transactionCount: count
            }))
        };
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
}

(async () => {
    const tools = await getOnChainTools({
        wallet: viem(walletClient),
        plugins: [sendETH(), erc20({ tokens: [USDC, MODE] }), kim()],
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    while (true) {
        const prompt = await new Promise<string>((resolve) => {
            rl.question('Enter your prompt (or "exit" to quit): ', resolve);
        });

        if (prompt === "exit") {
            rl.close();
            break;
        }

        console.log("\n-------------------\n");
        console.log("FETCHING TRANSACTION DATA");
        
        try {
            const transactionAnalysis = await analyzeTokenTransactions();
            
            console.log("Top 5 Addresses by Transaction Count:");
            transactionAnalysis.topAddresses.forEach((item, index) => {
                console.log(`${index + 1}. Address: ${item.address} - Transactions: ${item.transactionCount}`);
            });

            console.log("\n-------------------\n");
            console.log("TOOLS CALLED");
            console.log("\n-------------------\n");

            console.log("\n-------------------\n");
            console.log("RESPONSE");
            console.log("\n-------------------\n");

            // Add transaction analysis data to the prompt
            const enhancedPrompt = `
                ${prompt}
                
                Transaction Analysis Data:
                Total Transactions: ${transactionAnalysis.totalTransactions}
                Top 5 Addresses by Transaction Count:
                ${transactionAnalysis.topAddresses.map((item, index) => 
                    `${index + 1}. ${item.address}: ${item.transactionCount} transactions`
                ).join('\n')}
            `;

            const result = await generateText({
                model: openai("gpt-4o-mini"),
                tools: tools,
                maxSteps: 10,
                prompt: enhancedPrompt,
                onStepFinish: (event) => {
                    console.log(event.toolResults);
                },
            });
            console.log(result.text);

            // Check if the prompt is to post the top 5 traders to Twitter
            if (prompt.toLowerCase().includes("post top 5 traders")) {
                const tweetText = `Top 5 MODE Token Traders by Transaction Count:\n\n${
                    transactionAnalysis.topAddresses.map((item, index) => 
                        `${index + 1}. ${item.address}: ${item.transactionCount} transactions`
                    ).join('\n')
                }\n\n#MODE #Blockchain #Crypto`;
                await postTweet(tweetText);
            }
        } catch (error) {
            console.error(error);
        }
        console.log("\n-------------------\n");
    }
})();