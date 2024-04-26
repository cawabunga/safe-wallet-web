import { Interface } from 'ethers'
import chains from '@/config/chains'

export const WETH_ADDRESS_DICT = {
  [chains.eth]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  [chains.sep]: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9',
}

export const WETH_METADATA = {
  symbol: 'WETH',
  decimals: 18,
}

export const wethTokenInterface = new Interface([
  'function balanceOf(address _owner) public view returns (uint256 balance)',
  // Deposits ETH and mints corresponding amount of WETH
  'function deposit() public payable',
  // Burns specified amount of WETH and releases equivalent amount of ETH
  'function withdraw(uint wad) public',
])
