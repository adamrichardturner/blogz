import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  Alert,
  TextareaAutosize,
} from '@mui/material'
import Loading from '../../common/Loading.js'

const BlogForm = ({ createBlog, theme }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: {
      text: '',
    },
  })

  const [errors, setErrors] = useState({
    title: '',
    content: '',
    form: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleTitleChange = ({ target }) => {
    setNewBlog((prevState) => ({
      ...prevState,
      title: target.value,
    }))
  }

  const handleContentChange = ({ target }) => {
    setNewBlog((prevState) => ({
      ...prevState,
      content: {
        ...prevState.content,
        text: target.value,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await createBlog(newBlog)
      setNewBlog({
        title: '',
        content: {
          text: '',
        },
      })
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: 'Error creating blog. Please try again.',
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    if (!newBlog.title.trim()) {
      newErrors.title = 'Title is required'
      isValid = false
    }

    if (!newBlog.content.text.trim()) {
      newErrors.content = 'Content is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  return (
    <Box
      backgroundColor="paper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h2" marginBottom={2} fontSize={'1.25rem'}>
        Create a Blog
      </Typography>
      {errors.form && <Alert severity="error">{errors.form}</Alert>}
      <Box
        width="100%"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'center',
        }}
      >
        {!isLoading ? (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormControl fullWidth>
              <TextField
                label="Blog Title"
                variant="outlined"
                fullWidth
                id="title"
                type="text"
                value={newBlog.title}
                onChange={handleTitleChange}
                helperText={errors.title}
                inputProps={{ maxLength: 120 }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextareaAutosize
                id="content"
                minRows={4}
                maxRows={10}
                value={newBlog.content.text}
                onChange={handleContentChange}
                maxLength={4000}
                placeholder="What's on your mind?"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  width: '100%',
                  padding: '8px',
                  marginTop: '1rem',
                  resize: 'none',
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.background.default,
                }}
              />
              {errors.content && (
                <div style={{ color: 'red', marginTop: '8px' }}>
                  {errors.content}
                </div>
              )}
            </FormControl>
            <Button
              variant="contained"
              id="add-blog"
              type="submit"
              color="primary"
              sx={{
                color: '#fff',
                borderColor: '#fff',
                padding: '16px 16px',
                width: '100%',
                borderRadius: '5px',
                marginTop: 2,
              }}
            >
              Create Blog
            </Button>
          </form>
        ) : (
          <Loading mode="small" />
        )}
      </Box>
    </Box>
  )
}

export default BlogForm
