ShowJob = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      subscription: Meteor.subscribe('jobById', String(FlowRouter.getParam('_id'))),
      job: Jobs.findOne()
    }
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
              <div className="row">
                <div className="three columns">
                  {this.data.job && this.data.job.company? (
                    <div className="company">{this.data.job && this.data.job.company}</div>
                  ) : null}
                  {this.data.job && this.data.job.homepage? (
                    <a className="homepage" href={this.data.job && this.data.job.homepage} target="_blank">{this.data.job && this.data.job.homepage}</a>
                  ) : null}
                  <div className="email">{this.data.job && this.data.job.email}</div>
                </div>
                <div className="nine columns">
                  {this.data.job && this.data.job.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
