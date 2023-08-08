import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import { Modal } from '../src'

describe('Modal', () => {
  it('renders without errors', () => {
    render(<Modal onClose={() => {}} />)
  })

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn()
    render(<Modal onClose={onCloseMock} />)

    fireEvent.click(screen.getByLabelText('Close modal'))

    expect(onCloseMock).toHaveBeenCalled()
  })

  it('renders children', () => {
    const { getByText } = render(<Modal onClose={() => {}}>Hello</Modal>)

    expect(getByText('Hello')).toBeInTheDocument()
  })
})
