# Solana Token Holders Scraper

This NodeJS script automates the process of scraping and filtering Solana token holders when the address is not whitelisted.

## Features

- **Scraping Solana Token Holders**: Automatically retrieves token holder data from the Solana blockchain.
- **Filtering**: Filters out holders if they are present in whitelist address.
- **Output**: Formats and exports the data into a CSV or Excel file for easy access and manipulation.

## Output Format

The exported data will be in the following format:

| Owner Address   | Token Account  | Token Amount | Token Account State |
| --------------- | -------------- | ------------ | ------------------- |
| `example_addr1` | `example_acc1` | 100          | Active              |

## Prerequisites

Before running the script, ensure you have NodeJS installed on your machine. You can download and install NodeJS from [Node.js official website](https://nodejs.org/).

## Configuration

1. **Whitelist File**: Create a `WhiteList.txt` file in the root directory and add the addresses to be whitelisted, each on a new line.
<!-- 2. **constatnt.js file**: Navigate to `src/constants/constatnt.js` file and  -->

## Usage

To run the script, use the following command:

```bash
node src/index.js
```
