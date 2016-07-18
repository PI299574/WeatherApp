//Coomment Box
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
  render: function(){
    return (
      <div className="movieList">
      <Movie Title="BatMan">
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
  render : function(){
    var md = new Remarkable();
    return(

      <div className="movie">
      <h2 className="movieName">
      {this.props.Title}
      </h2>
    {md.render(this.props.children.toString())}
      </div>
    );
  }
});

ReactDOM.render(
  <MovieBox />,
  document.getElementById('content')
);
