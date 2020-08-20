import React from 'react'

class Playlist extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            dataGenre:[],
            genreTypeId:'',
            dataPlaylist:[],
            songToDeleteId:''
        }
        this.genreSelectChanged=this.genreSelectChanged.bind(this)
        this.deleteFromPlaylist=this.deleteFromPlaylist.bind(this)
    }
     componentDidMount() {//after all the elements of the page is rendered correctly, this method is called
        const serverUrl = 'http://localhost:3002/allGenre'
        fetch(serverUrl, { method: 'GET' })
                .then(response => response.json())
                .then(json => this.setState({
                    dataGenre: json.rows
            }))
    }
    componentDidUpdate(prevProps, prevState, snapshot) {//It is called when a component got updated
        if(this.state.genreTypeId !== prevState.genreTypeId) {//when dropdown selection is changed by the user
            const serverUrl = 'http://localhost:3002/getPlaylists/'+this.state.genreTypeId
            fetch(serverUrl, { method: 'GET' })
                .then(response => response.json())
                .then(json => this.setState({
                    dataPlaylist: json.rows
                }))
        }
        if(this.state.songToDeleteId !== prevState.songToDeleteId){//when delete button is pressed
            const serverUrl = 'http://localhost:3002/deleteFromPlaylist/'+this.state.songToDeleteId
            fetch(serverUrl, { method: 'DELETE' })

            const currentPlaylist = this.state.dataPlaylist;
            const songId=parseInt(this.state.songToDeleteId,10)

            this.setState({
            dataPlaylist: currentPlaylist.filter(playlist => playlist.id !== songId),
            });
        }
     }
     genreSelectChanged(event){//change state of variable when dropdwon selection changes
        this.setState({
           genreTypeId:event.target.value
        })
    }
    deleteFromPlaylist(event){//change state variable when delete button is pressed
        this.setState({
            songToDeleteId:event.target.value
         })
    }
    render() {
        var { dataGenre } = this.state;////accessing state variable inside render in html elements
        var { dataPlaylist } = this.state;
        return (
            <div id="playlistDiv">
                <div id="playlistHeading">
                    <h3><span>wHATS IN PLAYLIST</span></h3>
                </div>
                <div id="selectionDiv">
                    <select onChange={this.genreSelectChanged} value={this.state.genreTypeId}>
                        {dataGenre.map(genre => 
                            <option class="optionGenre" key={genre.title} value={genre.id}>{genre.title}</option>
                        )}
                    </select>
                </div>
                <div id="playlistTableDiv">
                    <table id="playlistTable">
                        <thead>
                            <tr>
                                <th>Album Cover</th>
                                <th>Title</th>
                                <th>Country</th>
                                <th>Extra Information</th>
                                <th>Delete from Playist</th>
                           </tr>
                        </thead>
                    {dataPlaylist.map(song => 
                        <tbody>
                            <tr>
                                <td><img src={song.image} alt="cover"/></td>
                                <td>{song.title}</td>
                                <td>{song.country}</td>
                                <td><a href={'http://www.discogs.com/'+song.uri}>More Information</a></td>
                                <td>
                                    <button class='playlistBtn' value={song.id} onClick={this.deleteFromPlaylist}>Delete</button>
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

export default Playlist;