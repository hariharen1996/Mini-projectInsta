import {Switch, Route} from 'react-router-dom'
import LoginRoute from './components/LoginRoute/index'
import HomeRoute from './components/HomeRoute'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import UsersProfileRoute from './components/UsersProfileRoute'
import MyProfileRoute from './components/MyProfileRoute'
import NotFoundRoute from './components/NotFoundRoute'

const App = () => (
  <>
    <Switch>
      {/* <HeaderRoute /> */}
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={HomeRoute} />
      <ProtectedRoute
        exact
        path="/users/:usersId"
        component={UsersProfileRoute}
      />
      <ProtectedRoute exact path="/my-profile" component={MyProfileRoute} />
      <Route exact component={NotFoundRoute} />
    </Switch>
  </>
)

export default App
