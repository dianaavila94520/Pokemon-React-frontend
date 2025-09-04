import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './fanta.css';
import './App.css';

createRoot(document.getElementById('root')).render(
 <StrictMode>
  <App />
 </StrictMode>
);
