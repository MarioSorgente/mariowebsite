import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './styles/app.css';
import App from './App.tsx';

const container = document.getElementById('root')!;

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// The home page ships with its markup already in the HTML, so it hydrates.
// Every other route is served from an empty shell and renders from scratch.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
