ShowJob = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      subscription: Meteor.subscribe('jobById', String(FlowRouter.getParam('_id'))),
      job: Jobs.findOne()
    }
  },

  createdAt() {
    return moment(this.data.job && this.data.job.createdAt).format('L');
  },

  mailtoEmail() {
    return `mailto:${this.data.job && this.data.job.email}`
  },

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="twelve columns show-job">
              <div className="row">
                <div className="twelve columns">
                  <h1>{this.data.job && this.data.job.title}</h1>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="three columns">
                  {this.data.job && this.data.job.company? (
                    <div><i className="fa fa-building"></i><span className="company">{this.data.job.company}</span></div>
                  ) : null}
                  {this.data.job && this.data.job.homepage? (
                    <div><i className="fa fa-desktop"></i><a className="homepage" href={this.data.job && this.data.job.homepage} target="_blank">{this.data.job && this.data.job.homepage}</a></div>
                  ) : null}
                  <i className="fa fa-envelope"></i><a className="email" href={this.mailtoEmail()}>{this.data.job && this.data.job.email}</a>
                  <hr />
                  <i className="fa fa-calendar"></i><span className="created-at">Posted on {this.createdAt()}</span>
                </div>
                <div className="nine columns">
                  <pre>{this.data.job && this.data.job.description}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
