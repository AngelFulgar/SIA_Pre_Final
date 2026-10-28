import { AppProvider } from './context/AppContext'
import { CatalogPage } from './pages/CatalogPage'
import { ToastContainer } from './components/feedback'
import { useToast } from './hooks/useToast'

function AppContent() {
  const { toasts, dismissToast, notify } = useToast()

  return (
    <>
      <CatalogPage notify={notify} />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
