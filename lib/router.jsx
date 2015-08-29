FlowRouter.route('/', {
  name: 'home',
  action: (params) => {
    renderMainLayoutWith();
    setTitle();
  }
});

let renderMainLayoutWith = (component) => {
  ReactLayout.render(MainLayout, {
    component: component
  })
};
