RemoveJob = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      subscription: Meteor.subscribe('jobByIdentifier', String(FlowRouter.getParam('identifier'))),
      job: Jobs.findOne()
    }
  },

  render() {
    // call Meteor method to activate the job posting
    if (this.data.job) {
      if (confirm('Do you really want to remove this job?')) {
        Meteor.call('jobs.remove', String(FlowRouter.getParam('identifier')), (error) => {
          if (error) {
            sAlert.error(error.reason);
          } else {
            FlowRouter.go('/');
          }
        });
      } else {
        FlowRouter.go('/');
      }
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <div className="alert info">
                Removing job posting
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
