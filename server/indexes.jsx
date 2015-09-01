if (Meteor.isServer) {
  Jobs._ensureIndex({
    'title': 'text',
    'description': 'text'
  });
}
