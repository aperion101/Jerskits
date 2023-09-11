import { Route, Routes } from 'react-router-dom'
import { Landing, SignIn, SignUp } from './pages'
import { Profile } from './pages'
import Favorites from './pages/Profile/components/Favorites'
import Orders from './pages/Profile/components/Orders'
import Setting from './pages/Profile/components/Setting'
import { Edit } from './pages/Profile/components'
import { AuthenticationLayout, Layout } from './layouts'
import 'swiper/css'
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path='profile' element={<Profile />}>
              <Route path='edit' element={<Edit />} />
              <Route path='favorites' element={<Favorites />} />
              <Route path='orders' element={<Orders />} />
              <Route path='setting' element={<Setting />} />
            </Route>
          </Route>
          <Route
            path='/sign-in'
            element={<AuthenticationLayout children={<SignIn />} />}
          />
          <Route
            path='/sign-up'
            element={<AuthenticationLayout children={<SignUp />} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
