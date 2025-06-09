import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import ErrorBoundary from './errorBoundary/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ErrorBoundary>
            <App />
            </ErrorBoundary>
        </PersistGate>
    </Provider>

)
