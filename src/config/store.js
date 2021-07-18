import React , { Component,createContext } from 'react';

const StoreContext = createContext();

class StoreProvider extends Component{
    constructor(props){
        super(props)
        this.state = {
            theme:'light',
            nowPlaying:{
                "kind": "track",
                "id": 242638919,
                "created_at": "2016/01/18 23:18:34 +0000",
                "duration": 535586,
                "commentable": true,
                "comment_count": 2,
                "sharing": "public",
                "tag_list": " Jazz",
                "streamable": true,
                "embeddable_by": "all",
                "purchase_url": null,
                "purchase_title": null,
                "genre": "Blues",
                "title": "Wynton Marsalis & Eric Clapton - Layla",
                "description": "What'll you do when you get lonely\nAnd nobody's waiting by your side?\nYou've been running and hiding much too long.\nYou know it's just your foolish pride.\n\nLayla, you've got me on my knees.\nLayla, I'm begging, darling please.\nLayla, darling won't you ease my worried mind.\n\nI tried to give you consolation\nWhen your old man had let you down.\nLike a fool, I fell in love with you,\nTurned my whole world upside down.\n\nLet's make the best of the situation\nBefore I finally go insane.\nPlease don't say we'll never find a way\nAnd tell me all my love's in vain.\n",
                "label_name": null,
                "release": null,
                "key_signature": null,
                "isrc": null,
                "bpm": null,
                "release_year": null,
                "release_month": null,
                "release_day": null,
                "license": "all-rights-reserved",
                "uri": "https://api.soundcloud.com/tracks/242638919",
                "user": {
                    "avatar_url": "https://i1.sndcdn.com/avatars-000215641584-xgo1b9-large.jpg",
                    "id": 25772732,
                    "kind": "user",
                    "permalink_url": "https://soundcloud.com/motaz-m-elzeidy",
                    "uri": "https://api.soundcloud.com/users/25772732",
                    "username": "Moataz M. Elzeidy",
                    "permalink": "motaz-m-elzeidy",
                    "created_at": "2012/10/09 09:36:21 +0000",
                    "last_modified": "2017/01/13 22:23:34 +0000",
                    "first_name": "Moaataz",
                    "last_name": "El-Zeidy",
                    "full_name": "Moaataz El-Zeidy",
                    "city": "Cairo",
                    "description": "~\nانا فقط أعرف ما لا أريد!",
                    "country": "Egypt",
                    "track_count": 31,
                    "public_favorites_count": 0,
                    "reposts_count": 0,
                    "followers_count": 0,
                    "followings_count": 0,
                    "plan": "Free",
                    "myspace_name": null,
                    "discogs_name": null,
                    "website_title": "",
                    "website": "http://www.behance.net/motazdesign",
                    "comments_count": 5,
                    "online": false,
                    "likes_count": 0,
                    "playlist_count": 8,
                    "subscriptions": [
                        {
                            "product": {
                                "id": "free",
                                "name": "Free"
                            }
                        }
                    ]
                },
                "permalink_url": "https://soundcloud.com/motaz-m-elzeidy/wynton-marsalis-eric-clapton-layla",
                "artwork_url": "https://i1.sndcdn.com/artworks-000143676463-18udj0-large.jpg",
                "stream_url": "https://api.soundcloud.com/tracks/242638919/stream",
                "download_url": "https://api.soundcloud.com/tracks/242638919/download",
                "waveform_url": "https://wave.sndcdn.com/13rj10bLi9up_m.png",
                "available_country_codes": null,
                "secret_uri": null,
                "user_favorite": null,
                "user_playback_count": null,
                "playback_count": 55314,
                "download_count": 0,
                "favoritings_count": 985,
                "reposts_count": 117,
                "downloadable": false,
                "access": "playable",
                "policy": null,
                "monetization_model": null
            },
            newTrack:null

        }
    }

    handlerContext = (key,value) => {
        this.setState({ [key] : value });
    }

    getColors = () => {
        const { theme } = this.state;
        return {
            focused: theme === 'light' ? "#000DAE" : "dodgerblue",
            smallIcon: theme === 'light' ? "#000DAE" : "#203786",
            error: theme === 'light' ? "rgb(186, 0, 0)" : "red",
            mainText: theme === 'light' ? "#222" : "whitesmoke",
            lightBg: theme === 'light' ? "#D6DFFE" : "#223B8E",
            inputField: theme === 'light' ? "#D6DFFE" : "#222",
            baseBg: theme === 'light' ? "#EFEFEF" : "#1a1a1a",
            icon: theme === 'light' ? '#222' : "white",
            primary: "rgba(5, 150, 105, 1)",
            success:"rgba(5, 150, 105, 1)",
            lightText:"#ccc",
            mutedText:"#666",
        }
    }

    render(){
        return(
            <StoreContext.Provider 
                    value = {{
                        ...this.state,
                        handlerContext: this.handlerContext,
                        colors: this.getColors()
                    }}
                >
                {this.props.children}
            </StoreContext.Provider>
        )
    }
} 


export { StoreContext,StoreProvider }
