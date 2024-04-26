import { Box, Button, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { safeParseUnits } from '@/utils/formatters'
import { validateLimitedAmount } from '@/utils/validation'

interface WrapEthFormProps {
  maxAmount: bigint | undefined
  onSubmit: (data: { amount: bigint }) => void
  submitText: string
  tokenDecimals: number
}

export function WrapEthForm({ maxAmount, onSubmit, submitText, tokenDecimals }: WrapEthFormProps) {
  const { handleSubmit, control } = useForm<{ amount: string }>({
    defaultValues: {
      amount: '',
    },
  })

  return (
    <form
      onSubmit={handleSubmit((fields) => {
        const amount = safeParseUnits(fields.amount, tokenDecimals)

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
            validate: (value) => validateLimitedAmount(value, tokenDecimals, maxAmount?.toString()),
          }}
        />

        <Button type="submit" variant="contained">
          {submitText}
        </Button>
      </Box>
    </form>
  )
}
