FlowRouter.route('/', {
  name: 'home',
  action: (params) => {
    renderMainLayoutWith();
    setTitle('Jobs');
  }
});

let renderMainLayoutWith = (component) => {
  ReactLayout.render(MainLayout, {
    component: component
  })
};
