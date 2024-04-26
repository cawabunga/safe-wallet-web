# Adds ETH/WETH Wrapping Functionality for Safe Accounts

## Description

This PR introduces core functionality for wrapping and unwrapping ETH/WETH within a Safe account.

## What's Done:

**Shows Balances**: Shows both ETH and WETH balances for the connected Safe account.

**Wrapping Functionality**: Lets users convert ETH within their Safe to WETH.

**Unwrapping Functionality**: Lets users convert WETH back to ETH within their Safe.

**Input Validation**: Prevents users from wrapping/unwrapping amounts exceeding their Safe balance.

## How It's Done:
PR:
- utilizes `react-hook-form` library for form validation and form state management
- utilizes `ethers` library for interacting with the blockchain with help of `ethers.Interface`
- reuses exising validation, parse and format functions where applicable
- introduces hooks to fetch ETH and WETH balances
- employs hardcoded `weth` config file (meta information it is not expected to change)

## Follow-up improvements (ideas):
- Update balances in near real-time (not just on page load)
- Add support for other networks (now only supports Ethereum and Sepolia) or show placeholder for them
- Separate balance fetching logic and WETH interface for better organization
- Add support for type-safe ERC20 tokens to increase flexibility
- Update UI/UX of the widget (e.g. add loading states, error handling, avoid layout shifts on validation, add "max" button etc.)
- Separate general fetcher logic from the widget to make it reusable
