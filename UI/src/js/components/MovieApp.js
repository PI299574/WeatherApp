
var React = require('react');
var Navbar = require('./Navbar');
var ResultItems=React.createClass({


  saveFormData: function(e) {
   //var buttonValue=ReactDOM.findDOMNode(this.refs.btn).value;
  //alert(buttonValue);
    e.preventDefault();
    //alert("Azax")
    var url='/movies/insert';
    var data={
        Title:this.props.Title,
        Year:this.props.Year,
        Rated:this.props.Rated,
        Released:this.props.Released,
        Genre:this.props.Genre,
        Runtime:this.props.Runtime,
        Director:this.props.Director,
        Writer:this.props.Writer,
        Actors:this.props.Actors,
        Plot:this.props.Plot,
        Language:this.props.Language,
        Country:this.props.Country,
        Awards:this.props.Awards,
        Metascore:this.props.Metascore,
        imdbRating:this.props.imdbRating,
        imdbVotes:this.props.imdbVotes,
        Type:this.props.Type,
        Response:this.props.Response,
        imdbID:this.props.imdbID,
        Images:this.props.Poster
}
    alert(data.Title);
      $.ajax({
          type:"POST",
           dataType:'json',
           url:url,
           data:data
         }).done(function(data) {
    console.log("success");
  })
  .fail(function(jqXhr) {
    console.log('failed to register');
  });
  },

  render:function(){
    //console.log("L3 Poster"+this.props.Poster);
    //console.log("L3 Title" +this.props.Title);
return(
//{this.props.searchResults.response.Director}
<div className="row">

<form className="" id="" action="" onSubmit={this.saveFormData} >
<div className="col-md-4">
<img src= {this.props.Poster}  alt="No Poster available" width="98%" height="400px"/>
</div>
<div className="col-md-8">
<h3>{this.props.Title}</h3><br/>
Year:{this.props.Year}<br/>
Actors:{this.props.Actors}<br/>
Director:{this.props.Director}<br/>
Writer:{this.props.Writer}<br/>
Plot:{this.props.Plot}<br/>
Rated:{this.props.Rated}<br/>
Released:{this.props.Released}<br/>
Genre:{this.props.Genre}<br/>
RunTime:{this.props.Runtime}<br/>
Raiting:{this.props.imdbRating}<br/>
ImdbId:{this.props.imdbID}<br/>
Type:{this.props.Type}<br/>
{this.props.Language}
{this.props.Country}
{this.props.Awards}
{this.props.Metascore}
{this.props.imdbVotes}
{this.props.Response}
<br/>
  <input type="submit" ref="" value="Add To Database" />&nbsp;
</div>
</form>
</div>
);
}
});

var Result=React.createClass({
  render:function(){
//console.log("L12 type is " + typeof this.props.searchResults);
console.log("L13 string is " + JSON.stringify(this.props.searchResults));

    var resultItems=this.props.searchResults.map(function(result,i){
    //var resultItems=this.props.searchResults.map(function(response,i){
//console.log("L16 " + response.imdbID + " "+ response.Director );
    return <ResultItems key={i}  Title= {result.Title}
    Year= {result.Year} Rated= {result.Rated} Released= {result.Released} Runtime= {result.Runtime}
    Genre= {result.Genre} Director={result.Director} Writer= {result.Writer} Actors= {result.Actors}
    Plot= {result.Plot} Language= {result.Language} Country={result.Country} Awards= {result.Awards}
    Poster= {result.Poster} Metascore= {result.Metascore} imdbRating= {result.imdbRating}
     imdbVotes= {result.imdbVotes} Type= {result.Type} Response= {result.Response}  imdbID={result.imdbID}
/>
/*
return <ResultItems key={i}  Title= {response.Title}
Year= {response.Year} Rated= {response.Rated} Released= {response.Released} Runtime= {response.Runtime}
Genre= {response.Genre} Director={response.Director} Writer= {response.Writer} Actors= {response.Actors}
Plot= {response.Plot} Language= {response.Language} Country={response.Country} Awards= {response.Awards}
Poster= {response.Poster} Metascore= {response.Metascore} imdbRating= {response.imdbRating}
 imdbVotes= {response.imdbVotes} Type= {response.Type} Response= {response.Response}  imdbID={response.imdbID}
     />
*/
    });

//console.log("L18 "+ {resultItems});
return(<div>{resultItems}</div>);
  }
});



var MovieApp=React.createClass({
getInitialState:function(){
  return{
    searchResults:[]
  };
},
showResults:function(response){
  console.log("L117" +response);
  console.log("L93" +JSON.stringify(response.Search));
  //console.log("L93" +JSON.stringify(response));
  this.setState({
    searchResults:response.Search
    //searchResults:[response]
  });
},

search:function(url){
  alert("search method")
$.ajax({
    type:"GET",
    dataType:'json',
    url:url,
     success: function(response){
                this.showResults(response);
              }.bind(this),
    failure:function(err){
      console.error("L134"+err);

    }
   });
//console.log("L133"+ response);
},

  render:function(){
  return(  <div>
    <Searchbox search={this.search}/>
    <Result searchResults={this.state.searchResults} />
    </div>
  );
  }
});


var Searchbox=React.createClass({

  createAjax:function(e){
    //alert("ajax calling");
    e.preventDefault();
    //console.log(this);
    var query=React.findDOMNode(this.refs.query).value;
    //var query="sultan";
    var year=React.findDOMNode(this.refs.year).value;
    //var year="2016";
   var category = React.findDOMNode(this.refs.category).value;
  // var Btn_value = ReactDOM.findDOMNode(this.refs.but_value).value;

   //alert(Btn_value);
  //  var category="full";
  var url='http://www.omdbapi.com/?s='+query+'&y='+year+'&plot='+category+'&r=json';

//var url='http://www.omdbapi.com/?t='+query+'&y='+year+'&plot='+category+'&r=json';
//var url='https://itunes.apple.com/search?term=fun';
//var _id="577638518cfb07f5513bd045";
//var url='/movies/findbyId/_id/577638518cfb07f5513bd045';
console.log("L138" +url)
    this.props.search(url)

  },

  render:function(){

    return(
      <div id="searchbox">
      <form className=""  onSubmit={this.createAjax}>
      <input type="text" ref="query" placeholder="Search Your movie"  />
      <input type="text" ref="year" placeholder="Year" />
      <select ref="category">
                    <option value="short">short</option>
                    <option value="full">full</option>
                </select>
        <input type="submit" value="submit" />


        </form>
      </div>
    );
  }

});


// ReactDOM.render(
//   <MovieApp/>,
//   document.getElementById('content')
// );
  module.exports= MovieApp;
