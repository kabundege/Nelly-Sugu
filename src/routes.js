import { BrowserRouter, Route,Switch } from 'react-router-dom'
import App from './album'
import Posts from './Posts'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/posts" component={Posts} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
