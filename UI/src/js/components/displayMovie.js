var ResultItems=React.createClass({
  deletaFormdata:function(e){
  e.preventDefault();
  alert("ajax delete call");

  var ID=this.props._id;
  //alert(ID)
  var url='/movies/delete/_id'+'/'+ID;
  console.log("L35"+url);
  $.ajax({
      type:"DELETE",
       dataType:'json',
       url:url
     }).done(function(data) {
console.log("Delete success");
})
.fail(function(xhr, status, err) {

console.log('failed to Delete');
});
},
  render:function(){

    console.log("L3 Title" +this.props.Title);
return(

<div className="row">
<form className="" id="" action="" onSubmit={this.saveFormData} >
<div className="col-md-4">
{this.props.Images}
<img src= {this.props.Poster}  alt="No Poster available" width="" height=""/>
</div>
<div className="col-md-8">
<div>
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
Language:{this.props.Language}<br/>
Country:{this.props.Country}<br/>
Awards:{this.props.Awards}<br/>
MetaScore:{this.props.Metascore}<br/>
imdbVotes:{this.props.imdbVotes}<br/>
Response:{this.props.Response}<br/>

  <input type="submit" ref="" value="Delete" onClick={this.deletaFormdata}/>
</div>
</div>
</form>
</div>
    );
  }
});

var Result=React.createClass({
  render:function(){
console.log("L12 type is " + typeof this.props.searchResults);
console.log("L13 string is " + JSON.stringify(this.props.searchResults));

    var resultItems=this.props.searchResults.map(function(result,i){

    return <ResultItems key={i}  Title= {result.Title}
    Year= {result.Year} Rated= {result.Rated} Released= {result.Released} Runtime= {result.Runtime}
    Genre= {result.Genre} Director={result.Director} Writer= {result.Writer} Actors= {result.Actors}
    Plot= {result.Plot} Language= {result.Language} Country={result.Country} Awards= {result.Awards}
    Poster= {result.Images} Metascore= {result.Metascore} imdbRating= {result.imdbRating}
     imdbVotes= {result.imdbVotes} Type= {result.Type} Response= {result.Response}  imdbID={result.imdbID}
    _id={result._id}  />

    });


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
  //alert("Show")
  console.log("L118" +JSON.stringify(response));

  this.setState({
    searchResults:response
  });
  console.log("L124"+JSON.stringify(this.state.searchResults));
},

search:function(url){
 alert("search method")
$.ajax({
    type:"GET",
    cache: false,
    dataType:'json',
    url:"http://localhost:8080/movies/findAll",
     success:function(response){
                this.showResults(response);
              }.bind(this),
    error: function(xhr, status, err){
        console.error("http://localhost:8080/movies/findAll", status, err.toString());
    }.bind(this)
   });

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
    e.preventDefault();
var url='http://localhost:8080/movies/findAll';
console.log("L138" +url)
    this.props.search(url)
  },

  render:function(){

    return(
      <div id="searchbox">
      <a href="" onClick={this.createAjax} >Movies</a>
      </div>
    );
  }

});


ReactDOM.render(
  <MovieApp/>,
  document.getElementById('content')
);

module.exports = MovieApp;
