import { Box, Button, TextField } from '@mui/material'
import { modalStyle } from '../shared/styles'
import React from 'react'

type ModalContentProps = {
  onChangeHandler: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>
  invalidText: boolean
  text: string
  buttonText: string
  titleText: string
  disableButton?: boolean
}

export const ModalContent = ({
  onChangeHandler,
  onClickHandler,
  invalidText,
  text,
  buttonText,
  titleText,
  disableButton,
}: ModalContentProps): JSX.Element => (
  <Box sx={modalStyle}>
    <h2>{titleText}</h2>
    <Box sx={{ marginBottom: '1rem' }}>
      <TextField
        fullWidth
        error={invalidText}
        label="Description"
        value={text}
        onChange={onChangeHandler}
      />
    </Box>
    <Button
      disabled={invalidText || text.length < 1 || disableButton}
      variant="outlined"
      onClick={onClickHandler}
    >
      {buttonText}
    </Button>
  </Box>
)
