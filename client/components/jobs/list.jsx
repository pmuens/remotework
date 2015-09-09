JobsList = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    // save the searchQuery if the user has searched for something
    let searchQuery = '';
    if (window.location.hash.length !== 0) {
      searchQuery = window.location.hash.substring(1);
    }
    return {
      searchQuery: searchQuery,
      jobLimit: parseInt(this.props.limit) || this.increment()
    }
  },

  getMeteorData() {
    let jobsSubscription = Meteor.subscribe('jobs', this.state.searchQuery, this.state.jobLimit);
    // sort jobs by score if a searchQuery is entered
    let jobs = (this.state.searchQuery !== '' ? Jobs.find({}, { sort: [['score', 'desc']] }).fetch() : Jobs.find({}, { sort: { createdAt: -1 } }).fetch());
    return {
      subscription: jobsSubscription,
      jobs: jobs
    }
  },

  searchJobs(event) {
    event.preventDefault();
    this.setState({ searchQuery: document.getElementById('search-query').value });
  },

  watchSearchQuery(event) {
    event.preventDefault();
    let searchQuery = document.getElementById('search-query').value;
    // store the searchQuery in the hash
    window.location.hash = searchQuery;
    // reset the searchQuery-Variable if nothing is entered
    if (searchQuery.length === 0) {
      this.setState({ searchQuery: '' });
    }
  },

  increment() {
    return 20;
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.filter !== this.props.filter) {
      this.setState({jobLimit: nextProps.limit})
    }
  },

  jobItems() {
    return _.map(this.data.jobs, (job) => {
      return <JobItem job={job}/>;
    });
  },

  loadMore() {
    if(Jobs.find({}, { limit: this.jobLimit }).count() === this.state.jobLimit) {
      return <a className="button u-full-width" onClick={this.onLoadMore}>Load more</a>
    }
  },

  onLoadMore() {
    this.setState({ jobLimit: this.state.jobLimit + this.increment() })
  },

  componentDidMount() {
    if (window.location.hash.length !== 0) {
      document.getElementById('search-query').value = this.state.searchQuery;
    }
  },

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <form onSubmit={this.searchJobs}>
                <input type="text" id="search-query" className="u-full-width" placeholder="Type something (e.g. JavaScript or Design) and press enter" onChange={this.watchSearchQuery}/>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="twelve columns">
              {this.jobItems().length ? (
                this.jobItems()
              ) : <div className="alert info">There are no jobs available to display</div> }
            </div>
          </div>
          <div className="row">
            <div className="twelve columns">
              {this.loadMore()}
            </div>
          </div>
        </div>
      </div>
    )
  }
});
