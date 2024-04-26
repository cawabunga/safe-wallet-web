import { Typography } from '@mui/material'
import { useCurrentChain } from '@/hooks/useChains'
import WalletBalance from '@/components/common/WalletBalance'
import { WrapEthForm } from './WrapEthForm'
import { wethTokenInterface } from './weth'
import useSafeBalance from './useSafeBalance'
import type { EthTransaction } from './useSafeTransactionFlow'
import { useWethAddress } from './useWethAddress'

interface WrapEthProps {
  onTxSubmit: (tx: EthTransaction) => void
}

export function WrapEth({ onTxSubmit }: WrapEthProps) {
  const currentChain = useCurrentChain()
  const wethAddress = useWethAddress()
  const [ethBalance, ethErr, ethLoading] = useSafeBalance()
  const nativeCurrencyDecimals = currentChain?.nativeCurrency.decimals ?? 18

  const handleSubmit = ({ amount }: { amount: bigint }) => {
    onTxSubmit({
      to: wethAddress,
      value: amount.toString(),
      data: wethTokenInterface.encodeFunctionData('deposit'),
    })
  }

  return (
    <>
      <Typography component="h3" variant="subtitle1" fontWeight={700} mb={1}>
        Your ETH balance is <WalletBalance balance={ethBalance} />
      </Typography>

      <WrapEthForm
        maxAmount={ethBalance}
        onSubmit={handleSubmit}
        submitText="Wrap"
        tokenDecimals={nativeCurrencyDecimals}
      />
    </>
  )
}
