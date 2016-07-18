

//console.log(jsonObject);

//Movie Box
var MovieBox = React.createClass({
  loadMoviesFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleMovieSubmit: function(movie) {
   // TODO: submit to the server and refresh the list
   $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: movie,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
 },

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.loadMoviesFromServer();
    setInterval(this.loadMoviesFromServer, this.props.pollInterval);
  },

  render : function(){
    return(
      <div className="movieBox">
      <MovieForm onMovieSubmit={this.handleMovieSubmit} />
      <MovieList data={this.state.data}/>

      </div>
    );
  }
});

//MovieList

var MovieList = React.createClass({


    render: function() {
      var movieNodes = this.props.data.map(function(movie) {

        return (
          <Movie
          Title={movie.Title}
          key={movie._id}
          Poster={movie.Poster}
          Year={movie.Year}
          imdbID={movie.imdbID}>

          </Movie>
        );
  });
  return (
    <div className="movieList">
      {movieNodes}
    </div>
  );

      }
  });


//MovieForm
var MovieForm = React.createClass({
  getInitialState: function() {
   return {Title: ''};
  },
 handleTitleChange: function(e) {
   this.setState({Title: e.target.value});
 },
 handleSubmit: function(e) {
    e.preventDefault();
    var Title = this.state.Title.trim();
    if (!Title) {
      return;
    }
    // TODO: send request to the server
    this.props.onMovieSubmit({Title: Title});
    this.setState({Title: ''});
  },
  render : function(){
    return(
      <div className="search-form" >
          <h1 className="text-center">Search For a Movie </h1>
          <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <input
                  name="Title"
                  type="text"
                  className="form-control"
                  ref="title"
                  placeholder="Enter a Movie Title..."
                  value={this.state.Title}
                  onChange={this.handleTitleChange} />
               </div>
              <input className="btn btn-primary btn-block" type="submit" value="Search and Save" />

          </form>
      </div>

    );
  }
});

//Movie
var Movie = React.createClass({

  // rawMarkup: function() {
  //   var md = new Remarkable();
  //   var rawMarkup = md.render(this.props.children.toString());
  //   return { __html: rawMarkup };
  // },
  render : function(){
  //  var md = new Remarkable();
  //Following will provide security from XSS attack

    return(

      <div className="movie">
      <h2 className="movieName"> </h2>
      <div className="well">
          <div className="row">
              <div className="col-md-2">
                  <img className="thumbnail" src={this.props.Poster}/>
              </div>
              <div className="col-md-10">
              <h4>{this.props.Title}</h4>
              <ul className='list-group'>
                  <li className='list-group-item'>Year Released : {this.props.Year}</li>
                  <li className='list-group-item'>IMDB Id : {this.props.imdbID}</li>
              </ul>
              <a className="btn btn-primary" href={"http://www.imdb.com/title/"+this.props.imdbID} > View on IMDB</a>

              </div>
          </div>

      </div>
  </div>
    );
  }
});

ReactDOM.render(
  <MovieBox url="http://localhost:8080/api/movies" pollInterval={2000}/>,
  document.getElementById('content')
);
