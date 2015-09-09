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

    const slug = getSlug(job.title);
    const identifier = Random.hexString(64);
    _.extend(job, { identifier: identifier, slug: slug });

    // send an E-Mail to the user
    if (Meteor.isServer) {
      Meteor.defer(() => {
        Email.send({
          from: 'Remote Work <noreply@remotework.in>',
          to: job.email,
          subject: 'Thank you for posting your job "' + job.title + '" on "Remote Work"',
          html: '' +
            '<b>Note: Keep this E-Mail as it gives you the possibility to activate, update and remove the job posting.</b>' +
            '<br /><br />' +
            'Please click the link below to activate your job posting: <br />' +
            '<a href="' + Meteor.absoluteUrl().substring(0, Meteor.absoluteUrl().length - 1) + FlowRouter.path('activateJob', { identifier: identifier }) + '" target="_blank">Activate job posting</a>' +
            '<br /><br />' +
            'Update or remove your job posting with these links: <br />' +
            '<a href="' + Meteor.absoluteUrl().substring(0, Meteor.absoluteUrl().length - 1) + FlowRouter.path('updateJob', { identifier: identifier }) + '" target="_blank">Update job posting</a>' +
            '<br />' +
            '<a href="' + Meteor.absoluteUrl().substring(0, Meteor.absoluteUrl().length - 1) + FlowRouter.path('removeJob', { identifier: identifier }) + '" target="_blank">Remove job posting</a>' +
            '<br /><br />' +
            'Regards' +
            '<br /><br />' +
            'The "Remote Work"-Team'
        });
      });
    }
    let jobID = Jobs.insert(job);
    return jobID;
  },

  'jobs.activate': (identifier) => {
    check(identifier, String);

    if (!identifier) {
      throw new Meteor.Error(422, 'Identifier should not be blank');
    }

    return Jobs.update(
      { identifier: identifier },
      { $set: { isActive: true } }
    );
  },

  'jobs.remove': (identifier) => {
    check(identifier, String);

    if (!identifier) {
      throw new Meteor.Error(422, 'Identifier should not be blank');
    }

    return Jobs.remove({ identifier: identifier });
  },

  'jobs.update': (identifier, job) => {
    check(identifier, String);
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

    const slug = getSlug(job.title);

    return Jobs.update(
      { identifier: identifier },
      { $set: { title: job.title, description: job.description, email: job.email, company: job.company, homepage: job.homepage, slug: slug } }
    );
  }
});

Jobs.before.insert((userId, document) => {
  document.isActive = false;
  document.createdAt = new Date();
  document.updatedAt = new Date();
});

Jobs.before.update((userId, document, fieldNames, modifier, options) => {
  modifier.$set = modifier.$set || {};
  modifier.$set.updatedAt = new Date();
});
