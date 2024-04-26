import { useWeb3ReadOnly } from '@/hooks/wallets/web3'
import useSafeInfo from '@/hooks/useSafeInfo'
import type { AsyncResult } from '@/hooks/useAsync'
import useAsync from '@/hooks/useAsync'

const useSafeBalance = (): AsyncResult<bigint | undefined> => {
  const web3ReadOnly = useWeb3ReadOnly()
  const { safeAddress } = useSafeInfo()

  return useAsync<bigint | undefined>(async () => {
    if (!safeAddress || !web3ReadOnly) {
      return undefined
    }

    return await web3ReadOnly.getBalance(safeAddress, 'latest')
  }, [safeAddress, web3ReadOnly])
}

export default useSafeBalance
