import React,{Component} from "react"
import SearchBar from "../components/search-bar"
import VideoList from "./video-list";
import VideoDetail from "../components/video-detail";
import Video from "../components/video";
import axios from "axios";

const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=true&append_to_response=images";
const API_KEY = "api_key=b79132e314d47e8edaa203e233f6be60";

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         movieList:{},
         currentMovie:{}
      }
   }
   componentWillMount() {
      this.initMovies()
   }
   initMovies(){
      axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response) {
         this.setState({movieList:response.data.results.slice(1,6),currentMovie:response.data.results[0]},function () {
            this.applyVideoToCurrentMovie();
         })
      }.bind(this));
   }

   applyVideoToCurrentMovie(){
      axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then(function (response) {
         const youtubeKey = response.data.videos.results[0].key;
         console.log("key youtube" ,youtubeKey)
         console.log("response", response)
         let newCurrentMovieState = this.state.currentMovie;
         newCurrentMovieState.videoId = youtubeKey;
         this.setState({currentMovie : newCurrentMovieState});

      }.bind(this));
   }

   getCallBack(movie) {
      this.setState({currentMovie:movie}, function () {
         this.applyVideoToCurrentMovie();
      })
   }

   render() {
      const renderVideoList = () => {
         if(this.state.movieList.length >= 5){
            return <VideoList movieList={this.state.movieList} callback={this.getCallBack.bind(this)}/>
         }
      };
      return (
         <div>
            <div className="search_bar">
               <SearchBar />
            </div>
            <div className="row">
               <div className="col-md-8">
                  <Video videoId={this.state.videoId} />
               </div>
               <div className="col-md-4">
                  {renderVideoList()}
               </div>
            </div>
            <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} />
         </div>
      )
   }
}

export default App;