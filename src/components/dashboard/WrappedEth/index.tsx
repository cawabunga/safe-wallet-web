import { Typography } from '@mui/material'
import { Card, WidgetBody, WidgetContainer } from '../styled'
import useSafeTransactionFlow from './useSafeTransactionFlow'
import { WrapEth } from './WrapEth'
import { UnwrapEth } from './UnwrapEth'

const WrappedEth = () => {
  const onTxSubmit = useSafeTransactionFlow()

  return (
    <WidgetContainer>
      <Typography component="h2" variant="subtitle1" fontWeight={700} mb={2}>
        Wrapped ETH
      </Typography>

      <WidgetBody>
        <Card>
          <WrapEth onTxSubmit={onTxSubmit} />
          <UnwrapEth onTxSubmit={onTxSubmit} />
        </Card>
      </WidgetBody>
    </WidgetContainer>
  )
}

export default WrappedEth
