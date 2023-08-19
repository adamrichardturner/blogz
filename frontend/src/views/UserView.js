import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ButtonBase,
} from '@mui/material'
import Loading from '../common/Loading'
import { Link } from 'react-router-dom'

const UserView = () => {
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs.blogs)

  if (!blogs) {
    return <Loading mode="large" />
  }

  // Filtering the blogs based on user id
  const rawBlogs = blogs.filter((blog) => blog.user.id === id)

  const userBlogs = [...rawBlogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  const blogRows = userBlogs.map((blog) => (
    <TableRow key={blog.id} hover role="checkbox">
      <TableCell
        sx={{
          padding: 0,
        }}
      >
        <ButtonBase
          component={Link}
          to={`/blogs/${blog.id}`}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '1.25rem 1rem 1.25rem 0',
            lineHeight: '1',
          }}
        >
          <Typography variant="paragraph" color="primary">
            {blog.title}
          </Typography>
        </ButtonBase>
      </TableCell>
      <TableCell
        sx={{
          padding: 0,
        }}
      >
        <ButtonBase
          component={Link}
          to={`/blogs/${blog.id}`}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '1.25rem 1rem 1.25rem 0',
            lineHeight: '1',
          }}
        >
          <Box>
            {new Date(blog.createdAt).toLocaleDateString()}{' '}
            {new Date(blog.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Box>
        </ButtonBase>
      </TableCell>
      <TableCell
        sx={{
          padding: 0,
        }}
      >
        <ButtonBase
          component={Link}
          to={`/blogs/${blog.id}`}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '1.25rem 1rem 1.25rem 0',
            lineHeight: '1',
          }}
        >
          <Box>{blog.comments.length}</Box>
        </ButtonBase>
      </TableCell>
      <TableCell
        sx={{
          padding: 0,
        }}
      >
        <ButtonBase
          component={Link}
          to={`/blogs/${blog.id}`}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '1.25rem 1rem 1.25rem 0',
            lineHeight: '1',
          }}
        >
          <Box>{blog.likedBy.length || 0}</Box>
        </ButtonBase>
      </TableCell>
    </TableRow>
  ))

  return (
    <Box marginBottom={5}>
      <Typography variant="h2" color="body" marginTop={'16px'} marginBottom={2}>
        Blogs by {userBlogs[0]?.user.name || 'User'}
      </Typography>
      <Table
        sx={{
          marginTop: '.5rem',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                padding: 0,
              }}
            >
              <Typography
                variant="paragraph"
                color="primary"
                fontWeight={'600'}
                paddingRight={'1rem'}
              >
                Title
              </Typography>
            </TableCell>
            <TableCell
              sx={{
                padding: 0,
              }}
            >
              <Typography
                variant="paragraph"
                color="primary"
                fontWeight={'600'}
                paddingRight={'1rem'}
              >
                Date Posted
              </Typography>
            </TableCell>
            <TableCell
              sx={{
                padding: 0,
              }}
            >
              <Typography
                variant="paragraph"
                color="primary"
                fontWeight={'600'}
                paddingRight={'1rem'}
              >
                Comments
              </Typography>
            </TableCell>
            <TableCell
              sx={{
                padding: 0,
              }}
            >
              <Typography
                variant="paragraph"
                color="primary"
                fontWeight={'600'}
                paddingRight={'1rem'}
              >
                Likes
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{blogRows}</TableBody>
      </Table>
    </Box>
  )
}

export default UserView
