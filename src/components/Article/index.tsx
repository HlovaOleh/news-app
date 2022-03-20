import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Typography,
} from '@mui/material'
import { Article } from '../../shared/types'

const ArticleView = ({
  source,
  author,
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  content,
}: Article) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const modelStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Grid container justifyContent="space-between">
              <Typography color="textSecondary" gutterBottom>
                {source.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {author}
              </Typography>
            </Grid>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Typography color="textSecondary">{publishedAt}</Typography>
            <Typography variant="body1" component="p">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleOpen}>
              Open
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modelStyle}>
          <Card>
            <CardMedia component="img" src={urlToImage} />
            <CardContent>
              <Typography color="primary" variant="h6">
                <a href={url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  {title}
                </a>
              </Typography>
              <Typography color="textSecondary" variant="subtitle2">
                {author}
              </Typography>
              <Typography variant="body2" component="p">
                {content}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  )
}

export default ArticleView
