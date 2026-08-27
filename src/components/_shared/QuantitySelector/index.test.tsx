import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import { QuantitySelector } from './index'

const Harness = ({
  min = 1,
  max = 5,
  disabled = false,
}: {
  min?: number
  max?: number
  disabled?: boolean
}) => {
  const [value, setValue] = useState(min)

  return (
    <QuantitySelector
      value={value}
      onChange={setValue}
      min={min}
      max={max}
      disabled={disabled}
    />
  )
}

describe('QuantitySelector', () => {
  it('increments and decrements within bounds', async () => {
    const user = userEvent.setup()
    render(<Harness max={3} />)

    const increase = screen.getByRole('button', { name: 'Increase quantity' })
    const decrease = screen.getByRole('button', { name: 'Decrease quantity' })

    expect(decrease).toBeDisabled()

    await user.click(increase)
    expect(screen.getByDisplayValue('2')).toBeInTheDocument()

    await user.click(increase)
    expect(screen.getByDisplayValue('3')).toBeInTheDocument()
    expect(increase).toBeDisabled()

    await user.click(decrease)
    expect(screen.getByDisplayValue('2')).toBeInTheDocument()
  })

  it('does not change value when disabled', async () => {
    const user = userEvent.setup()
    render(<Harness disabled />)

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))
    expect(screen.getByDisplayValue('1')).toBeInTheDocument()
  })
})
