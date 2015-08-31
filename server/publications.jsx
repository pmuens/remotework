Meteor.publish('jobs', () => {
  return Jobs.find(
    {},
    {
      sort: { createdAt: -1 },
      fields: { title: true, description: true, email: true, company: true, homepage: true, createdAt: true }
    }
  );
});
