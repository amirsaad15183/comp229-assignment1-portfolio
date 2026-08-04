import { Routes, Route } from 'react-router-dom'
import Layout from '../component/Layout'
import Home from '../component/home'
import About from './about'
import Projects from './project'
import Education from './education'
import Services from './services'
import Contact from './contact'
import SignIn from './signin'
import SignUp from './signup'

function MainRouter() {
  return (
    <Routes>
      {/* Shared layout wraps all portfolio pages. */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="education" element={<Education />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  )
}

export default MainRouter
