import { Toaster } from 'react-hot-toast';

const ToastProvider = () => (
  <Toaster 
    position="top-right"
    toastOptions={{
      style: {
        background: 'rgba(241, 252, 253, 0.95)',
        color: '#393737',
        border: '1px solid rgba(77, 109, 227, 0.2)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 8px 32px rgba(77, 109, 227, 0.15)',
      },
      success: {
        iconTheme: {
          primary: '#4D6DE3',
          secondary: '#F1FCFD',
        },
      },
      error: {
        iconTheme: {
          primary: '#e74c3c',
          secondary: '#F1FCFD',
        },
      },
      loading: {
        iconTheme: {
          primary: '#4D6DE3',
          secondary: '#F1FCFD',
        },
      },
    }}
  />
);

export default ToastProvider;
