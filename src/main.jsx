import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/base.css'
import Home from './pages/Home.jsx'
import SolarPage from './pages/SolarPage.jsx'
import ProjectPage from './pages/ProjectPage.jsx'

const { page, slug } = document.body.dataset
const Page = page === 'solar' ? SolarPage : page === 'project' ? () => <ProjectPage slug={slug} /> : Home

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)
