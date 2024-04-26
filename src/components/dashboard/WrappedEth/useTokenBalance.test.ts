import { JsonRpcProvider, Wallet } from 'ethers'
import useSafeInfo from '@/hooks/useSafeInfo'
import { renderHook, waitFor } from '@/tests/test-utils'
import { useTokenBalance } from './useTokenBalance'

const mockReadOnlyProvider = new JsonRpcProvider()

jest.mock('@/hooks/useSafeInfo', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@/hooks/wallets/web3', () => ({
  getWeb3ReadOnly: () => mockReadOnlyProvider,
}))

describe('useTokenBalance', () => {
  const tokenAddress = Wallet.createRandom().address
  // random address, but persistent across tests
  const safeAddress = '0xcacaf37c28a26f022e924759b7c74ec31f747d38'

  beforeEach(() => {
    jest.spyOn(mockReadOnlyProvider, 'call').mockResolvedValue('777')
    jest.mocked(useSafeInfo).mockReturnValue({ safeAddress } as any)
  })

  it('returns undefined if safeAddress is not defined', async () => {
    jest.mocked(useSafeInfo).mockReturnValue({ safeAddress: '' } as any)
    const { result } = renderHook(() => useTokenBalance(tokenAddress))

    expect(result.current).toEqual([undefined, undefined, true])
    await waitFor(() => {
      expect(result.current).toEqual([undefined, undefined, false])
    })
  })

  it('returns undefined if tokenAddress is not defined', async () => {
    const { result } = renderHook(() => useTokenBalance(''))

    expect(result.current).toEqual([undefined, undefined, true])
    await waitFor(() => {
      expect(result.current).toEqual([undefined, undefined, false])
    })
  })

  it('returns error when cannot fetch', async () => {
    jest.spyOn(mockReadOnlyProvider, 'call').mockRejectedValue(new Error('Invalid address'))
    const { result } = renderHook(() => useTokenBalance('0xinvalid'))
    await waitFor(() => {
      expect(result.current[1]).toBeInstanceOf(Error)
    })
  })

  // todo: this test outputs "test was not wrapped in act(...)" warning, need more investigation
  it('calls WETH.balanceOf', async () => {
    renderHook(() => useTokenBalance(tokenAddress))

    // todo: figure out why it calls `call` 100+ times instead of 1
    expect(mockReadOnlyProvider.call).toHaveBeenCalled()

    expect(mockReadOnlyProvider.call).toHaveBeenCalledWith(
      expect.objectContaining({
        to: tokenAddress,
        data: '0x70a08231000000000000000000000000cacaf37c28a26f022e924759b7c74ec31f747d38',
      }),
    )
  })
})
