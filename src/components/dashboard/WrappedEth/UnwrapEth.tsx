import { Box, Typography } from '@mui/material'
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
  const [balance, balanceErr, balanceLoading] = useTokenBalance(wethAddress)

  const wethDecimals = WETH_METADATA.decimals

  const handleSubmit = ({ amount }: { amount: bigint }) => {
    onTxSubmit({
      to: wethAddress,
      value: '0',
      data: wethTokenInterface.encodeFunctionData('withdraw', [amount.toString()]),
    })
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography component="h3" variant="subtitle1" fontWeight={700}>
        Your WETH balance is {formatVisualAmount(balance ?? 0, wethDecimals)}
      </Typography>

      <WrapEthForm maxAmount={balance} onSubmit={handleSubmit} submitText="Unwrap" tokenDecimals={wethDecimals} />
    </Box>
  )
}
