import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

  componentDidMount() {
    // Getting the lyrics data
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        this.setState({ lyrics: res.data.message.body.lyrics });

        // Getting the track info to use in the lyrics component
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => {
        this.setState({ track: res.data.message.body.track });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { track, lyrics } = this.state;

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <Fragment>
          <Link to="/" className="btn btn-sm btn-secondary mb-4">
            <i className="fas fa-chevron-left"></i> Go back
          </Link>
          <div className="card">
            <div className="card-header">
              <div className="h4">
                <span style={{ color: '#fff' }}>{track.track_name}</span> by{' '}
                <span className="text-primary">{track.artist_name}</span>
              </div>
              <h6 className="mt-1">
                <strong>Explicit words: </strong>
                <span style={{ color: '#fff' }}>
                  {track.explicit === 0 ? 'No' : 'Yes'}
                </span>
              </h6>
              <h6 className="mt-1">
                <strong>Genre: </strong>
                <span style={{ color: '#fff' }}>
                  {track.primary_genres.music_genre_list.length !== 0
                    ? track.primary_genres.music_genre_list[0].music_genre
                        .music_genre_name
                    : 'N/A'}
                </span>
              </h6>
              <h6 className="mt-1">
                <strong>Release date: </strong>
                <span style={{ color: '#fff' }}>
                  <Moment format="DD/MM/YYYY">{track.updated_time}</Moment>
                </span>
              </h6>
            </div>
            <div className="card-body">
              {lyrics.lyrics_body.split('\n').map(lyric => {
                return <p className="card-text">{lyric}</p>;
              })}
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

export default Lyrics;
