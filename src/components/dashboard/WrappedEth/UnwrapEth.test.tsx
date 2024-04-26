import { render, screen, act, fireEvent } from '@/tests/test-utils'
import { UnwrapEth } from './UnwrapEth'
import { useWethAddress } from './useWethAddress'

jest.mock('./useTokenBalance', () => ({
  useTokenBalance: jest.fn(() => [BigInt(123e17), undefined, false]),
  __esModule: true,
}))

jest.mock('./useWethAddress', () => ({
  useWethAddress: jest.fn(() => '0x9876'),
  __esModule: true,
}))

describe('UnwrapEth', () => {
  it('gets and renders WETH balance', () => {
    render(<UnwrapEth onTxSubmit={jest.fn()} />)
    expect(useWethAddress).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Your WETH balance is 12.3')).toBeInTheDocument()
  })

  it('submits transaction to unwrap WETH', async () => {
    const onTxSubmit = jest.fn()
    render(<UnwrapEth onTxSubmit={onTxSubmit} />)

    expect(onTxSubmit).not.toHaveBeenCalled()

    const input = screen.getByLabelText('Amount')
    fireEvent.change(input, { target: { value: '0.2' } })

    await act(async () => {
      screen.getByRole('button', { name: /unwrap/i }).click()
    })

    expect(onTxSubmit).toHaveBeenCalledTimes(1)
    expect(onTxSubmit).toHaveBeenCalledWith({
      to: '0x9876',
      value: '0',
      data: '0x2e1a7d4d00000000000000000000000000000000000000000000000002c68af0bb140000',
    })
  })
})
