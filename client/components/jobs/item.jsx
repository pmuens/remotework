JobItem = React.createClass({
  createdAt() {
    return moment(this.props.job.createdAt).format('L');
  },

  render() {
    return (
      <div>
        <div className="job">
          <div className="row">
            <div className="twelve columns headline">
              <a className="title" href="#">{this.props.job.title}</a>
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
