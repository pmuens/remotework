Meteor.publish('jobs', (limit) => {
  check(limit, Number);

  return Jobs.find(
    {},
    {
      sort: { createdAt: -1 },
      fields: { title: true, description: true, email: true, company: true, homepage: true, createdAt: true },
      limit: limit
    }
  );
});

Meteor.publish('job', (_id) => {
  check(_id, String);

  return Jobs.find(
    { _id: _id }
  )
});
