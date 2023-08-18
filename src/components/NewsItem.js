import React, { Component } from 'react'
import No_Image_Available from './No_Image_Available.jpg'

export class NewsItem extends Component {
  render() {
    let {title, description, imgurl, newsurl, author, date, source} = this.props;
    return (
      <div>
        
        <div className="card" >
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"  style={{left : '88%'}} >{source?source:"Unknown source"}
          </span>
          <img src={imgurl?imgurl:No_Image_Available} className="card-img-top" alt="failed to load -dev"/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">by {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
            <a rel = "noreferrer"href={newsurl} target="_blank" className="btn btn-dark">read more</a>
        </div>
      </div>

      </div>
    )
  }
}

export default NewsItem

