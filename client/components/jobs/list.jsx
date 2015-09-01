JobsList = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return { jobLimit: parseInt(this.props.limit) || this.increment() }
  },

  getMeteorData() {
    let jobsSubscription =  Meteor.subscribe('jobs', this.state.jobLimit);
    return {
      subscription: jobsSubscription,
      jobs: Jobs.find({}, { sort: { createdAt: -1 } }).fetch()
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

  render() {
    return (
      <div>
        <div className="container">
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
