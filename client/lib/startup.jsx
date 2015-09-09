Meteor.startup(() => {
  NProgress.configure({
    showSpinner: false
  });

  sAlert.config({
    effect: 'scale',
    position: 'left-bottom',
    timeout: 5000
  });
});
