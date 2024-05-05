# Solana Token Holders Scraper

This NodeJS script automates the process of scraping and filtering Solana token holders from the Solana blockchain.

## Features

- **Scraping**: Automates the retrieval of Solana token holder data directly from the blockchain.
- **Filtering**: Implements logic to exclude holders listed in the provided whitelist.
- **Data Export**: Outputs the processed data into an Excel file.

## Output Format

The exported Excel file will contain the following columns:

| Owner Address   | Token Account  | Token Amount | Token Account State |
| --------------- | -------------- | ------------ | ------------------- |
| `example_addr1` | `example_acc1` | 100          | Active              |

## Prerequisites

Before you begin, ensure that NodeJS is installed on your system. Download and install NodeJS from the [official Node.js website](https://nodejs.org/).

## Configuration

To configure the scraper:

1. Populate the `WhiteListAddress.txt` files located in the `src/` directory. These files should contain the addresses you wish to exclude.
2. Open the `src/constants/constatnt.js` file and set your parameters.

## Usage

To execute the script, navigate to the root directory of the project and run the following command in your terminal:

```bash
node src/index.js
```
