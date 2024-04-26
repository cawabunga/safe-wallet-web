import { Box, Typography } from '@mui/material'
import { useCurrentChain } from '@/hooks/useChains'
import { formatVisualAmount } from '@/utils/formatters'
import { WrapEthForm } from './WrapEthForm'
import { wethTokenInterface } from './weth'
import useSafeBalance from './useSafeBalance'
import type { EthTransaction } from './useSafeTransactionFlow'
import { useWethAddress } from './useWethAddress'

interface WrapEthProps {
  onTxSubmit: (tx: EthTransaction) => void
}

export function WrapEth({ onTxSubmit }: WrapEthProps) {
  const wethAddress = useWethAddress()
  const [balance, balanceErr, balanceLoading] = useSafeBalance()

  const currentChain = useCurrentChain()
  const nativeCurrencyDecimals = currentChain?.nativeCurrency.decimals ?? 18

  const handleSubmit = ({ amount }: { amount: bigint }) => {
    onTxSubmit({
      to: wethAddress,
      value: amount.toString(),
      data: wethTokenInterface.encodeFunctionData('deposit'),
    })
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography component="h3" variant="subtitle1" fontWeight={700}>
        Your ETH balance is {formatVisualAmount(balance ?? 0, nativeCurrencyDecimals)}
      </Typography>

      <WrapEthForm
        maxAmount={balance}
        onSubmit={handleSubmit}
        submitText="Wrap"
        tokenDecimals={nativeCurrencyDecimals}
      />
    </Box>
  )
}
