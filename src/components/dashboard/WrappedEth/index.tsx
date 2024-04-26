import { Controller, useForm } from 'react-hook-form'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Card, WidgetBody, WidgetContainer } from '../styled'
import { formatVisualAmount, safeParseUnits } from '@/utils/formatters'
import WalletBalance from '@/components/common/WalletBalance'
import useSafeTransactionFlow from './useSafeTransactionFlow'
import { useTokenBalance } from './useTokenBalance'
import { useWethAddress } from './useWethAddress'
import { WETH_METADATA, wethTokenInterface } from './weth'
import useSafeBalance from './useSafeBalance'

const WrappedEth = () => {
  const onTxSubmit = useSafeTransactionFlow()

  const wethAddress = useWethAddress()

  const [wethBalance, wethErr, wethLoading] = useTokenBalance(wethAddress)
  const [ethBalance, ethErr, ethLoading] = useSafeBalance()

  const wethBalanceFormatted = formatVisualAmount(wethBalance || 0, WETH_METADATA.decimals)

  const { handleSubmit, control } = useForm<{ amount: string }>({
    defaultValues: {
      amount: '',
    },
  })

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
          <form
            onSubmit={handleSubmit((fields) => {
              const amount = safeParseUnits(fields.amount, WETH_METADATA.decimals)
              if (!amount) return

              onTxSubmit({
                to: wethAddress,
                value: amount.toString(),
                data: wethTokenInterface.encodeFunctionData('deposit'),
              })
            })}
          >
            <Box display="flex" mb={3} gap={2}>
              <Controller
                render={({ field, fieldState: { error } }) => (
                  <TextField label="Amount" {...field} error={!!error} helperText={error?.message} />
                )}
                name="amount"
                control={control}
                rules={{
                  required: 'Amount is required',
                  // todo: can be reused from `TokenAmountInput`
                  validate: (value) => {
                    const parsed = safeParseUnits(value, WETH_METADATA.decimals)
                    if (!parsed) return 'Invalid amount'
                    if (parsed > (ethBalance ?? 0)) return 'Insufficient balance'
                    return true
                  },
                }}
              />

              <Button type="submit" variant="contained">
                Wrap
              </Button>
            </Box>
          </form>

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
