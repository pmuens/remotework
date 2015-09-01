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
