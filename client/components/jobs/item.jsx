JobItem = React.createClass({
  createdAt() {
    return moment(this.props.job.createdAt).format('L');
  },

  render() {
    let jobPath = FlowRouter.path('showJob', this.props.job);
    return (
      <div>
        <div className="job-item">
          <div className="row">
            <div className="twelve columns headline">
              <a className="title" href={jobPath}>{this.props.job.title}</a>
            </div>
          </div>
          <div className="row">
            <div className="three columns">
              {this.createdAt()}
            </div>
            {this.props.job.company ? (
              <div className="nine columns">
                <span className="u-pull-right">{this.props.job.company}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
});
