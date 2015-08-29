FlowRouter.route('/', {
  name: 'home',
  action: (params) => {
    renderMainLayoutWith();
    setTitle('Jobs');
  }
});

FlowRouter.route('/jobs/add', {
  name: 'addJob',
  action: (params) => {
    renderMainLayoutWith(<AddJob />);
    setTitle('Add job')
  }
});

let renderMainLayoutWith = (component) => {
  ReactLayout.render(MainLayout, {
    component: component
  })
};
