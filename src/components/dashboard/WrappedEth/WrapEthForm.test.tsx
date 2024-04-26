import { fireEvent, render, screen, act } from '@/tests/test-utils'
import { WrapEthForm } from '@/components/dashboard/WrappedEth/WrapEthForm'

describe('WrapEthForm', () => {
  it('calls onSubmit with fields values when submitted', async () => {
    const onSubmit = jest.fn()
    render(<WrapEthForm maxAmount={100n} onSubmit={onSubmit} submitText="SUBMIT" tokenDecimals={2} />)

    const input = screen.getByLabelText('Amount')
    fireEvent.change(input, { target: { value: '0.2' } })

    expect(onSubmit).not.toHaveBeenCalled()

    await act(async () => {
      fireEvent.submit(screen.getByRole('form', { name: '' }))
    })

    expect(onSubmit).toHaveBeenCalledWith({ amount: 20n })
  })

  it.each(['2', 'nan', ''])('does not call onSubmit when amount is invalid', async (inputVal) => {
    const onSubmit = jest.fn()
    render(<WrapEthForm maxAmount={100n} onSubmit={onSubmit} submitText="SUBMIT" tokenDecimals={2} />)

    const input = screen.getByLabelText('Amount')
    fireEvent.change(input, { target: { value: inputVal } })

    await act(async () => {
      fireEvent.submit(screen.getByRole('form', { name: '' }))
    })

    expect(onSubmit).not.toHaveBeenCalled()
  })
})
