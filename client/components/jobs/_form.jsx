JobForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  componentWillReceiveProps(nextProps) {
    let job = nextProps.job;
    let identifier = nextProps.identifier;
    this.setState({ identifier: identifier, title: job.title, description: job.description, email: job.email, company: job.company, homepage: job.homepage });
  },

  getInitialState() {
    return {
      identifier: '',
      title: '',
      description: '',
      email: '',
      company: '',
      homepage: '',
      submitErrors: {}
    };
  },

  errorMessage (field) {
    return this.state.submitErrors[field];
  },

  errorClass(field) {
    return !!this.state.submitErrors[field] ? 'has-error' : '';
  },

  onSubmit(event) {
    event.preventDefault();

    var job = {
      title: this.state.title,
      description: this.state.description,
      email: this.state.email,
      company: this.state.company,
      homepage: this.state.homepage
    };

    var errors = {};
    if (!job.title) {
      errors.title = 'Title should not be blank';
    }
    if (!job.description) {
      errors.description = 'Description should not be blank';
    }
    if (!job.email) {
      errors.email = 'E-Mail should not be blank';
    }
    if (!job.title || !job.description || !job.email ) {
      return this.setState({submitErrors: errors});
    } else {
      if (this.props.action === 'add') {
        Meteor.call('jobs.add', job, (error) => {
          if (error) {
            sAlert.error(error.reason);
          } else {
            FlowRouter.go('/');
          }
        });
      } else {
        Meteor.call('jobs.update', this.state.identifier, job, (error) => {
          if (error) {
            sAlert.error(error.reason);
          } else {
            FlowRouter.go('/');
          }
        });
      }
    }
  },

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="six columns offset-by-three">
              <div className="alert info">
                <b>Note:</b> Please submit only job offers. Inconvenient / Spam entries might be removed.
              </div>
              <form className="add-update-job" onSubmit={this.onSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" className={"u-full-width " + this.errorClass('title')} placeholder="Title" valueLink={this.linkState('title')}/>
                <div className="help-block">{this.errorMessage('title')}</div>
                <label htmlFor="description">Description</label>
                <textarea className={"u-full-width " + this.errorClass('description')} rows="20" placeholder="Description" valueLink={this.linkState('description')}></textarea>
                <div className="help-block">{this.errorMessage('description')}</div>
                <label htmlFor="email">E-Mail</label>
                <input type="email" className={"u-full-width " + this.errorClass('email')} placeholder="E-Mail" valueLink={this.linkState('email')}/>
                <div className="help-block">{this.errorMessage('email')}</div>
                <label htmlFor="company">Company (optional)</label>
                <input type="text" className="u-full-width" placeholder="Company (optional)" valueLink={this.linkState('company')}/>
                <label htmlFor="homepage">Homepage (optional)</label>
                <input type="text" className="u-full-width" placeholder="Homepage (optional)" valueLink={this.linkState('homepage')}/>
                <input type="submit" className="button button-primary u-full-width" value="Save"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
