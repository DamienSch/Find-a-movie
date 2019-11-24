import React,{Component} from "react"

class SearchBar extends Component {
   constructor(props) {
      super(props);
      this.state = {searchText:"",placeHolder:"Tapez votre film..."}
   }
   render() {
      return (
         <div className="row">
            <div className="col-md-8">
               <input type="text" onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder} />
            </div>
         </div>
      )
   }
   handleChange(event){
      this.setState({searchText:event.target.value});
   }
}

export default SearchBar;