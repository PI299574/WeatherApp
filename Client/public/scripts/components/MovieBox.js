//Create Movie Box Component
var MovieBox = React.createClass({
  // Load movie data from Mongo DB.
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
  // Search movie and save in Mongo DB and refresh the movie list
  handleMovieSubmit: function(movie) {
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
// Delete movie from Mongo DB.
 handleMovieDelete: function(Movieid){
   console.log(Movieid);
     $.ajax({
       url: this.props.url+'/'+Movieid,
       data: {"id" : Movieid},
       type: 'DELETE',
       dataType: 'json',
       success: function (data) {
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
      <MovieList  onMovieDelete={this.handleMovieDelete} data={this.state.data}/>

      </div>
    );
  }
});
