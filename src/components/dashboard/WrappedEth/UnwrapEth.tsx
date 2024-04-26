import { Typography } from '@mui/material'
import { formatVisualAmount } from '@/utils/formatters'
import { WETH_METADATA, wethTokenInterface } from './weth'
import { WrapEthForm } from './WrapEthForm'
import type { EthTransaction } from './useSafeTransactionFlow'
import { useWethAddress } from './useWethAddress'
import { useTokenBalance } from './useTokenBalance'

interface WrapEthProps {
  onTxSubmit: (tx: EthTransaction) => void
}

export function UnwrapEth({ onTxSubmit }: WrapEthProps) {
  const wethAddress = useWethAddress()
  const [wethBalance, wethErr, wethLoading] = useTokenBalance(wethAddress)
  const wethBalanceFormatted = formatVisualAmount(wethBalance || 0, WETH_METADATA.decimals)

  const handleSubmit = ({ amount }: { amount: bigint }) => {
    onTxSubmit({
      to: wethAddress,
      value: '0',
      data: wethTokenInterface.encodeFunctionData('withdraw', [amount.toString()]),
    })
  }

  return (
    <>
      <Typography component="h3" variant="subtitle1" fontWeight={700} mb={1}>
        Your WETH balance is {wethBalanceFormatted} {WETH_METADATA.symbol}
      </Typography>

      <WrapEthForm
        maxAmount={wethBalance}
        onSubmit={handleSubmit}
        submitText="Unwrap"
        tokenDecimals={WETH_METADATA.decimals}
      />
    </>
  )
}
