import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'




export class News extends Component {
  

static defaultProps = {
    country:'us',
    pagesize:8,
    category:'general'
}

static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    cayegory: PropTypes.string
}



capitalizeFirstLetter = (string) =>{
  return string.charAt(0).toUpperCase() + string.slice(1);

}
constructor(props){
  super(props);
  console.log("this is the news component");
  this.state = {
    articles: [],
    loading: false,
    page: 1,
    totalResults: 0
  }
  document.title = `${this.capitalizeFirstLetter(this.props.category)} - Echo news`;

}

async componentDidMount(){
  // console.log("this is componentdidMount");
  this.update(1);
}



update = async(page) => {
  this.props.setProgress(10);
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${page}&pagesize=${this.props.pagesize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  this.props.setProgress(40);
  let parsedData = await data.json();
  this.props.setProgress(70);
  this.setState({
    articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading:false,
    page: page // update the page state after the API call completes
  });
  this.props.setProgress(100);
}

handlePrevClick = async () => {
  let newPage = this.state.page - 1;
  this.update(newPage);
}

handleNextClick = async () => {
  if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pagesize)) {
    // do nothing
  } else {
    let newPage = this.state.page + 1;
    this.update(newPage);
  }
}


// fetchMoreData = async (page) => {

// let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${page}&pagesize=${this.props.pagesize}`;
//   this.setState({loading:true});
//   let data = await fetch(url);
//   let parsedData = await data.json();
//   this.setState({
//     articles: this.state.articles.concat(parsedData.articles),
//     totalResults: parsedData.totalResults,      
//     loading:false,
//     page:page
    
//   });



//   };


  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center' style = {{marginTop: '73px'}}>  {`Echo news - top ${this.capitalizeFirstLetter(this.props.category)}  Headlines` }</h2>
        {this.state.loading && < Spinner/>}



        {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData(this.state.page+1)}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        > */}
          
        



          <div className="row">

                {!this.state.loading && this.state.articles.map((element) => {
                    return <div className="col-md-4" key = {element.url}>
                              <NewsItem title={element.title ?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):" "} imgurl = {element.urlToImage} newsurl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.id}/>
                          </div>
                  })}
              
          </div>

          {/* </InfiniteScroll> */}

          <div className="container d-flex justify-content-between my-4">
            <button disabled={this.state.page === 1 }type="button" className="btn btn-dark" onClick = {this.handlePrevClick}> &larr; previous</button>
            <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-dark" onClick = {this.handleNextClick}>next &rarr;</button>
          </div>



      </div>
    )
  }
}

export default News
