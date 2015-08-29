JobsList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      subscriptions: Meteor.subscribe('jobs'),
      jobs: Jobs.find({}, { sort: { createdAt: -1 } }).fetch()
    }
  },

  jobItems() {
    return _.map(this.data.jobs, (job) => {
      return <JobItem job={job}/>;
    });
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
        </div>
      </div>
    )
  }
});
