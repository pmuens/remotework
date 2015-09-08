JobItem = React.createClass({
  createdAt() {
    return moment(this.props.job.createdAt).format('L');
  },

  jobPath() {
    return FlowRouter.path('showJob', { slug: this.props.job.slug });
  },

  render() {
    let jobPath = FlowRouter.path('showJob', this.props.job);
    return (
      <div>
        <div className="job-item">
          <div className="row">
            <div className="twelve columns headline">
              <a className="title" href={this.jobPath()}>{this.props.job.title}</a>
            </div>
          </div>
          <div className="row">
            <div className="three columns">
              <i className="fa fa-calendar"></i><span className="created-at">{this.createdAt()}</span>
            </div>
            {this.props.job.company ? (
              <div className="nine columns">
                <div className="u-pull-right"><i className="fa fa-building"></i><span className="company">{this.props.job.company}</span></div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
});
