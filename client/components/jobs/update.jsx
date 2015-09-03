UpdateJob = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      subscription: Meteor.subscribe('jobByIdentifier', String(FlowRouter.getParam('identifier'))),
      job: Jobs.findOne()
    }
  },

  render() {
    return <JobForm action='update' job={this.data.job} identifier={String(FlowRouter.getParam('identifier'))}/>
  }
});
