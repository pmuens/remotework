Jobs = new Mongo.Collection('jobs');

Meteor.methods({
  'jobs.add': (job) => {
    check(job, {
      title: String,
      description: String,
      email: String,
      company: String,
      homepage: String
    });

    if (!job.title) {
      throw new Meteor.Error(422, 'Title should not be blank');
    }
    if (!job.description) {
      throw new Meteor.Error(422, 'Description should not be blank');
    }
    if (!job.email) {
      throw new Meteor.Error(422, 'E-Mail should not be blank');
    }

    return Jobs.insert(job);
  }
});

Jobs.before.insert((userId, document) => {
  document.identifier = Random.hexString(64);
  document.isActive = false;
  document.createdAt = new Date();
  document.updatedAt = new Date();
});

Jobs.before.update((userId, document, fieldNames, modifier, options) => {
  modifier.$set = modifier.$set || {};
  modifier.$set.updatedAt = new Date();
});
