import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const theme = useTheme()
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <Box>
      {!visible && (
        <Button
          variant="contained"
          sx={{
            color: '#fff',
            borderColor: '#fff',
            padding: '6px 16px',
          }}
          className="toggle-button"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      )}
      <Modal
        open={visible}
        onClose={toggleVisibility}
        aria-labelledby="modal-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          bgcolor={theme.palette.background.default}
          boxShadow={24}
          padding={3}
          width={isSmallScreen ? '90%' : '600px'}
          borderRadius="8px"
        >
          {props.children}
        </Box>
      </Modal>
    </Box>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
