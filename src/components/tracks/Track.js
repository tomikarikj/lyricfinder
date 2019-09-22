import React from 'react';
import { Link } from 'react-router-dom';

const Track = props => {
  const { track } = props;

  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 style={{ color: '#fff' }}>{track.artist_name}</h5>
          <p className="card-text">
            <strong>
              <i className="fas fa-play"></i> Track
            </strong>
            : <span style={{ color: '#fff' }}>{track.track_name}</span>
            <br />
            <strong>
              <i className="fas fa-compact-disc"></i> Album
            </strong>
            : <span style={{ color: '#fff' }}>{track.album_name}</span>
          </p>
          <Link
            to={`lyrics/track/${track.track_id}`}
            className="btn btn-outline-primary btn-block"
          >
            <i className="fas fa-chevron-right"></i> View lyrics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Track;
