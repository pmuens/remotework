if (Meteor.isServer) {
  Jobs._ensureIndex({
    'title': 'text',
    'description': 'text'
  });
  Jobs._ensureIndex({
    'slug': 1
  });
}
