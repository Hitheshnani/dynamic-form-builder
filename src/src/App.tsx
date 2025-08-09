import { Routes, Route } from 'react-router-dom'
import { Container, Box } from '@mui/material'
import Navigation from './components/Navigation'
import CreateForm from './pages/CreateForm'
import PreviewForm from './pages/PreviewForm'
import MyForms from './pages/MyForms'

function App() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navigation />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<CreateForm />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/preview" element={<PreviewForm />} />
          <Route path="/myforms" element={<MyForms />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
