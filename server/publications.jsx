Meteor.publish('jobs', (searchQuery, limit) => {
  check(searchQuery, String);
  check(limit, Number);

  if (!searchQuery) {
    return Jobs.find(
      {},
      {
        sort: { createdAt: -1 },
        fields: { title: true, description: true, email: true, company: true, homepage: true, createdAt: true },
        limit: limit
      }
    );
  }
  return Jobs.find(
    { $text: { $search: searchQuery } },
    {
      fields: {
        title: true, description: true, email: true, company: true, homepage: true, createdAt: true,
        score: { $meta: 'textScore' }
      },
      sort: {
        score: { $meta: 'textScore' }
      },
      limit: limit
    }
  )
});

Meteor.publish('job', (_id) => {
  check(_id, String);

  return Jobs.find(
    { _id: _id }
  )
});
