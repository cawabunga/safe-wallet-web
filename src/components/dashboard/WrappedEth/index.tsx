import { Box, Button, TextField, Typography } from '@mui/material'
import { Card, WidgetBody, WidgetContainer } from '../styled'
import { formatVisualAmount } from '@/utils/formatters'
import WalletBalance from '@/components/common/WalletBalance'
import useSafeTransactionFlow from './useSafeTransactionFlow'
import { useTokenBalance } from './useTokenBalance'
import { useWethAddress } from './useWethAddress'
import { WETH_METADATA, wethTokenInterface } from './weth'
import useSafeBalance from './useSafeBalance'
import { WrapEthForm } from './WrapEthForm'

const WrappedEth = () => {
  const onTxSubmit = useSafeTransactionFlow()

  const wethAddress = useWethAddress()

  const [wethBalance, wethErr, wethLoading] = useTokenBalance(wethAddress)
  const [ethBalance, ethErr, ethLoading] = useSafeBalance()

  const wethBalanceFormatted = formatVisualAmount(wethBalance || 0, WETH_METADATA.decimals)

  return (
    <WidgetContainer>
      <Typography component="h2" variant="subtitle1" fontWeight={700} mb={2}>
        Wrapped ETH
      </Typography>

      <WidgetBody>
        <Card>
          <Typography component="h3" variant="subtitle1" fontWeight={700} mb={1}>
            Your ETH balance is <WalletBalance balance={ethBalance} />
          </Typography>

          {/* Wrap ETH */}
          <WrapEthForm
            maxAmount={ethBalance}
            onSubmit={({ amount }) => {
              onTxSubmit({
                to: wethAddress,
                value: amount.toString(),
                data: wethTokenInterface.encodeFunctionData('deposit'),
              })
            }}
          />

          <Typography component="h3" variant="subtitle1" fontWeight={700} mb={1}>
            Your WETH balance is {wethBalanceFormatted} {WETH_METADATA.symbol}
          </Typography>

          {/* Unwrap ETH */}
          <Box display="flex" gap={2}>
            <TextField label="Amount" />

            <Button variant="contained">Unwrap</Button>
          </Box>
        </Card>
      </WidgetBody>
    </WidgetContainer>
  )
}

export default WrappedEth
