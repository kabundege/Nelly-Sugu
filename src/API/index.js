import { Fetcher } from './Fetcher'

const baseUrl = 'https://api.soundcloud.com/'
const userId = '615892587'
const key = 'a0f84e7c2d612d845125fb5eebff5b37'

export const getHomeContent = () => {
    const url = baseUrl + `users/${userId}/favorites?client_id=${key}&limit=20&linked_partitioning=1`
    return Fetcher(url,"GET",undefined)
}

export const search = query => {}

export const getAudioLink = uri => uri + `?client_id=${key}`
