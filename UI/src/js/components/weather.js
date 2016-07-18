
var React = require('react');
var Navbar = require('./Navbar');
var ResultItems=React.createClass({


  saveFormData: function(e) {
   e.preventDefault();

    var url='/weather/insert';
    //var main=
    var data={

        cod:this.props.cod,
        name:this.props.name,
        id:this.props.id,
        temp:this.props.temp,

          pressure:this.props.pressure,
          humidity:this.props.humidity,
          temp_min:this.props.temp_min,
          temp_max:this.props.temp_max


}
    alert(data.cod);
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
<div className="" >

<form className="" id="" action="" onSubmit={this.saveFormData} >


cod:{this.props.cod}<br/>
Name:{this.props.name}<br/>
Id:{this.props.id}<br/>
Temp:{this.props.temp}<br/>
Pressure:{this.props.pressure}<br/>
Humidity:{this.props.humidity}<br/>
Temp_Min:{this.props.temp_min}<br/>
temp_Max:{this.props.temp_max}<br/>

  <input type="submit" ref="" value="Add To Database" />&nbsp;

</form>
</div>
);
}
});

var Result=React.createClass({
  render:function(){
//console.log("L12 type is " + typeof this.props.searchResults);
console.log("L13 string is " + JSON.stringify(this.props.searchResults));

  //  var resultItems=this.props.searchResults.map(function(result,i){
    var resultItems=this.props.searchResults.map(function(response,i){
console.log("L16 " + response.name + " "+ response.cod +"" + response.id + "" +response.main.temp );
    return <ResultItems key={i}  cod= {response.cod}
  name= {response.name} Rated= {response.Rated} id= {response.id} temp= {response.main.temp}
    pressure= {response.main.pressure} humidity={response.main.humidity} temp_min= {response.main.temp_min}
    temp_max= {response.main.temp_max}
    /*
    Plot= {result.Plot} Language= {result.Language} Country={result.Country} Awards= {result.Awards}
    Poster= {result.Poster} Metascore= {result.Metascore} imdbRating= {result.imdbRating}
     imdbVotes= {result.imdbVotes} Type= {result.Type} Response= {result.Response}  imdbID={result.imdbID}
*/
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



var weather=React.createClass({
getInitialState:function(){
  return{
    searchResults:[]
  };
},
showResults:function(response){
  console.log("L117" +response);
  //console.log("L93" +JSON.stringify(response.Search));
  //console.log("L93" +JSON.stringify(response));
  this.setState({
  //  searchResults:response.Search
    searchResults:[response]
  });
},

search:function(url){
  alert("search method")
$.ajax({
    type:"GET",
    url:url,
    dataType:'json',
     success: function(response){
                this.showResults(response);
              }.bind(this),
    failure:function(err){
      console.error("L134"+err);

    }
   });
//console.log("L1"+ JSON.stringify(response));
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
  //  var query=React.findDOMNode(this.refs.query).value;
    //var query="sultan";
    //var year=React.findDOMNode(this.refs.year).value;
    //var year="2016";
  // var category = React.findDOMNode(this.refs.category).value;

  //var url='http://www.omdbapi.com/?s='+query+'&y='+year+'&plot='+category+'&r=json';
var url='http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=f6b0e8e3d39fa4b3e2def9de1f37122b';
//var url='http://www.omdbapi.com/?t='+query+'&y='+year+'&plot='+category+'&r=json';
//var url='https://itunes.apple.com/search?term=fun';
//var _id="577638518cfb07f5513bd045";
//var url='/weather/findAll';
console.log("L138" +url)
    this.props.search(url)

  },

  render:function(){

    return(
      <div id="searchbox">

   <form className=""  onSubmit={this.createAjax}>


      <select ref="category">
                    <option value="short">Bangalore</option>
                    <option value="full">Chennai</option>
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
  module.exports= weather;
