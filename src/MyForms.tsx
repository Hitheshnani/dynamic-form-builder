import React, { useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { Delete, Visibility, Add } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from './store'
import { loadForms, deleteForm } from './savedFormsSlice'
import { loadForm } from './formBuilderSlice'

const MyForms: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { forms } = useSelector((state: RootState) => state.savedForms)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [formToDelete, setFormToDelete] = React.useState<string | null>(null)

  useEffect(() => {
    dispatch(loadForms())
  }, [dispatch])

  const handlePreviewForm = (formId: string) => {
    const form = forms.find(f => f.id === formId)
    if (form) {
      dispatch(loadForm(form))
      navigate('/preview')
    }
  }

  const handleDeleteForm = (formId: string) => {
    setFormToDelete(formId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (formToDelete) {
      dispatch(deleteForm(formToDelete))
      setDeleteDialogOpen(false)
      setFormToDelete(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">My Forms</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/create')}
        >
          Create New Form
        </Button>
      </Box>

      {forms.length === 0 ? (
        <Alert severity="info">
          No forms saved yet. Create your first form to get started!
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {forms.map((form) => (
            <Grid item xs={12} sm={6} md={4} key={form.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {form.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created: {formatDate(form.createdAt)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fields: {form.fields.length}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => handlePreviewForm(form.id)}
                  >
                    Preview
                  </Button>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteForm(form.id)}
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Form</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this form? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default MyForms
