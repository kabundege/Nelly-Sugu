import { Route,Switch, useLocation } from 'react-router-dom'
import { StoreProvider } from './config/store'
import MusicPlayer from './pages/MusicPlayer'
import Album from './pages/album'
import Posts from './pages/Posts'

const Routes = () => {
    const location = useLocation()
    return(
        <StoreProvider>
            <Switch location={location}>
                <Route exact path="/lbum" component={Album} />
                <Route exact path="/posts" component={Posts} />
                <Route path="/" component={MusicPlayer} />
            </Switch>
        </StoreProvider>
    )
}

export default Routes
