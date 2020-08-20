import React from 'react'

class Discogs extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={//state variables
            searchString:'',
            dataDiscogs:[],
            trackInfo:null
        }
        this.searchStringChanged=this.searchStringChanged.bind(this)//binding functions to the class
        this.addToPlaylist=this.addToPlaylist.bind(this)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {//It is called when a component got updated, in this case when a string os typed in search box
        if(this.state.searchString !== prevState.searchString) {//Code to fetch jsonn object from discog's server
            const serverUrl = 'https://api.discogs.com/database/search?key=QFzPdxIuNIXOJopCjqkz&secret=kHJaGTQkZHGcjvxzZXSnQkrMMBKMgBqX&artist=%22+'+this.state.searchString+'+%22&country=canada%22'
            fetch(serverUrl, { method: 'GET' })
                .then(response => response.json())
                .then(json => this.setState({
                    dataDiscogs: json.results  //assigning json object array to datadiscogs
                }))
        }
     }
    searchStringChanged(event){//set state of the string to be searched
        this.setState({
           searchString:event.target.value
        })
    }
    addToPlaylist = track => event => {//function to add track to the playlist 
        const serverUrl = 'http://localhost:3002/addToPlaylist';
        const options= {
            method : 'POST', 
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(track)
        }
        fetch(serverUrl, options)

        event.target.style.backgroundColor = 'green' //turns the button green every time button '+' is clicked
        event.target.style.border ='none'
      }
    render() {//rendering layout on html page
        var { dataDiscogs } = this.state; //accessing state variable inside renderin html elements
        return (
            <div id="discogDiv">
                <div id="discogHeading">
                    <h3><span>EXPLORE THE LIBRARY</span></h3>
                </div>
                <div className="search">
                    <i className="fa fa-search"></i> 
                    <input className="input-field" type="text" name="searchStr" placeholder="Search..." onChange={this.searchStringChanged}/>
                </div>  
                <div className="discogTableDiv"> 
                    <table id="discogTable">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Label</th>
                                    <th>Genre</th>
                                    <th>Format</th>
                                    <th>Country</th>
                                    <th>Album Cover</th>
                                    <th>Extra Information</th>
                                    <th>Add To Playlist</th>
                                </tr>
                            </thead>
                        {dataDiscogs.map(track =>//loop through array of objects returned by discog 
                            <tbody>
                                <tr>
                                    <td>{track.title}</td>
                                    <td>{track.label}</td>
                                    <td>{track.genre}</td>
                                    <td>{track.format}</td>
                                    <td>{track.country}</td>
                                    <td><img src={track.thumb} alt="cover"/></td>
                                    <td>
                                        <a href={'http://www.discogs.com/'+track.uri}>More Information</a>
                                    </td>
                                    <td>
                                        <button className={track.title} value={track} onClick={this.addToPlaylist(track)}>+</button>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        )
    }
}

export default Discogs;