import { BrowserRouter, Route,Switch } from 'react-router-dom'
import App from './App'

export default () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </BrowserRouter>
    )
}