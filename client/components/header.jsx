Header = React.createClass({
  render() {
    return (
      <header className="main-header">
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <div className="text-center">
                <h1>
                  <a href="/">Remote Work</a>
                </h1>
                <p>Job board for everything that can be done remotely</p>
                <a className="button add-job" href="/jobs/add">Add job</a>
                <a className="button browse-jobs" href="/">Browse jobs</a>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
});
