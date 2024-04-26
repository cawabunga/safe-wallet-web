import { getWeb3ReadOnly } from '@/hooks/wallets/web3'
import useSafeInfo from '@/hooks/useSafeInfo'
import useAsync from '@/hooks/useAsync'
import { wethTokenInterface } from './weth'

/**
 * Fetches the balance of a token for the current safe.
 * It **does not** watch for balance changes.
 */
export const useTokenBalance = (tokenAddress: string) => {
  const { safeAddress } = useSafeInfo()

  return useAsync<bigint | undefined>(async () => {
    if (!safeAddress || !tokenAddress) {
      return undefined
    }

    const result = await fetchTokenBalance(safeAddress, tokenAddress)

    return result != null ? BigInt(result) : undefined
  }, [tokenAddress, safeAddress])
}

const fetchTokenBalance = async (safeAddress: string, tokenAddress: string): Promise<string | undefined> => {
  try {
    const web3ReadOnly = getWeb3ReadOnly()
    if (!tokenAddress || !web3ReadOnly) return undefined

    return await web3ReadOnly.call({
      to: tokenAddress,
      data: wethTokenInterface.encodeFunctionData('balanceOf', [safeAddress]),
    })
  } catch (err) {
    throw Error(`Error fetching token balance`, { cause: err })
  }
}
