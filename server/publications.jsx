Meteor.publish('jobs', () => {
  return Jobs.find(
    { isActive: true },
    {
      sort: { createdAt: -1 },
      fields: { title: true, description: true, email: true, company: true, homepage: true, createdAt: true }
    }
  );
});
