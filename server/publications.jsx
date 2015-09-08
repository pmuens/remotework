Meteor.publish('jobs', (searchQuery, limit) => {
  check(searchQuery, String);
  check(limit, Number);

  if (!searchQuery) {
    return Jobs.find(
      { isActive: true },
      {
        sort: { createdAt: -1 },
        fields: { title: true, description: true, email: true, company: true, homepage: true, slug: true, createdAt: true },
        limit: limit
      }
    );
  }
  return Jobs.find(
    { $text: { $search: searchQuery }, isActive: true },
    {
      fields: {
        title: true, description: true, email: true, company: true, homepage: true, slug: true, createdAt: true,
        score: { $meta: 'textScore' }
      },
      sort: {
        score: { $meta: 'textScore' }
      },
      limit: limit
    }
  )
});

Meteor.publish('jobById', (_id) => {
  check(_id, String);

  return Jobs.find(
    { _id: _id },
    { fields: { title: true, description: true, email: true, company: true, homepage: true, slug: true, createdAt: true } }
  )
});

Meteor.publish('jobByIdentifier', (identifier) => {
  check(identifier, String);

  return Jobs.find(
    { identifier: identifier },
    { fields: { title: true, description: true, email: true, company: true, homepage: true, slug: true, createdAt: true } }
  )
});
