import { getWeb3ReadOnly } from '@/hooks/wallets/web3'
import useSafeInfo from '@/hooks/useSafeInfo'
import useAsync from '@/hooks/useAsync'
import { wethTokenInterface } from './weth'

const fetchTokenBalance = async (safeAddress: string, tokenAddress: string): Promise<string> => {
  try {
    const web3ReadOnly = getWeb3ReadOnly()
    if (!tokenAddress || !web3ReadOnly) return '0'

    return await web3ReadOnly.call({
      to: tokenAddress,
      data: wethTokenInterface.encodeFunctionData('balanceOf', [safeAddress]),
    })
  } catch (err) {
    throw Error(`Error fetching Token balance:  ${err}`)
  }
}

export const useTokenBalance = (tokenAddress: string) => {
  const { safe, safeAddress } = useSafeInfo()

  return useAsync<bigint>(async () => {
    if (!safeAddress || !tokenAddress) {
      return 0n
    }

    return BigInt(await fetchTokenBalance(safeAddress, tokenAddress))
  }, [tokenAddress, safeAddress])
}
