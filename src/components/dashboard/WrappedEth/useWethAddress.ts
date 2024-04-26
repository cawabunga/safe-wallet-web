import useChainId from '@/hooks/useChainId'
import { WETH_ADDRESS_DICT } from './weth'

export function useWethAddress() {
  const chainId = useChainId()
  return WETH_ADDRESS_DICT[chainId]
}
