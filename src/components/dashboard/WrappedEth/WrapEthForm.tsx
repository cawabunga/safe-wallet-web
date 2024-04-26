import { Box, Button, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { safeParseUnits } from '@/utils/formatters'
import { WETH_METADATA } from '@/components/dashboard/WrappedEth/weth'

interface WrapEthFormProps {
  maxAmount: bigint | undefined
  onSubmit: (data: { amount: bigint }) => void
}

export function WrapEthForm({ maxAmount, onSubmit }: WrapEthFormProps) {
  const { handleSubmit, control } = useForm<{ amount: string }>({
    defaultValues: {
      amount: '',
    },
  })

  return (
    <form
      onSubmit={handleSubmit((fields) => {
        const amount = safeParseUnits(fields.amount, WETH_METADATA.decimals)

        // amount should've been parsed to a bigint, so this check is redundant
        if (amount == null) return

        onSubmit({ amount })
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
              if (parsed > (maxAmount ?? 0)) return 'Insufficient balance'
              return true
            },
          }}
        />

        <Button type="submit" variant="contained">
          Wrap
        </Button>
      </Box>
    </form>
  )
}
