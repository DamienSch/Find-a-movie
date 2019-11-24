import React from "react"
import VideoListItem from "../components/video-list-item";

const VideoList = (props) => {
   const {movieList} = props;
   return (
      <div>
         <ul>
            {
               movieList.map(movie => {
                  return <VideoListItem key={movie.id} movie={movie} callback={getCallBack}/>
               })
            }
         </ul>
      </div>
   );
   function getCallBack(movie){
      props.callback(movie);
      console.log("parent : " + movie);
   }
};

export default VideoList;