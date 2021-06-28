import { BrowserRouter, Route,Switch } from 'react-router-dom'
import App from './album'
import Posts from './Posts'

export default () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/posts" component={Posts} />
            </Switch>
        </BrowserRouter>
    )
}