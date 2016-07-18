

//console.log(jsonObject);

//Comment Box
var MovieBox = React.createClass({
  render : function(){
    return(
      <div className="movieBox">
      <h1>Movies</h1>
      <MovieList/>
      <MovieForm/>
      </div>
    );
  }
});

//MovieList
var MovieList = React.createClass({
  getInitialState: function() {
    return {
      Title: '',
      Year: ''
    };
  },
  componentDidMount: function(){
    //Get Movie Data from Ajax call
    this.serverRequest=$.get("http://localhost:8080/api/movies", function(result){
      var jsonObject = result[0];
      this.setState({
        Title : jsonObject.Title,
        Year : jsonObject.Year
      });
      console.log(result);
    }.bind(this));
  },
  render: function(){
    return (
      <div className="movieList">
      <Movie Title={this.state.Title} Year={this.state.Year}>
      This is one Movie
       We are accessing children
      </Movie>
      <Movie Title="SuperMan">This is *another* Movie</Movie>
      </div>
    );
  }
});
//MovieForm
var MovieForm = React.createClass({
  render : function(){
    return(
      <div className="movieForm">
        Hello, I am from MovieForm.
      </div>
    );
  }
});

//Movie
var Movie = React.createClass({

  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render : function(){
  //  var md = new Remarkable();
  //Following will provide security from XSS attack

    return(

      <div className="movie">
      <h2 className="movieName">
      {this.props.Title} , {this.props.Year}
      </h2>
      <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

ReactDOM.render(
  <MovieBox />,
  document.getElementById('content')
);
