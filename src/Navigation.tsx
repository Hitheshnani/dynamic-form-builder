import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './store'

const Navigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isDirty = useSelector((state: RootState) => state.formBuilder.isDirty)

  const navItems = [
    { path: '/create', label: 'Create Form' },
    { path: '/preview', label: 'Preview', disabled: !isDirty },
    { path: '/myforms', label: 'My Forms' },
  ]

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dynamic Form Builder
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              onClick={() => navigate(item.path)}
              disabled={item.disabled}
              variant={location.pathname === item.path ? 'contained' : 'text'}
              sx={{
                backgroundColor: location.pathname === item.path
                  ? 'rgba(255,255,255,0.1)'
                  : 'transparent',
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
