import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Homepage from './Homepage'
import React from 'react'
import { BrowserRouter } from "react-router-dom";

test('loads and displays greeting', async () => {
  // ARRANGE
  render(
    <React.StrictMode>
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    </React.StrictMode>
    )

  // ACT
  // await userEvent.click(screen.getByText('Load Greeting'))
  // await screen.findByRole('heading')

  // ASSERT
  // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  // expect(screen.getByRole('button')).toBeDisabled()
})