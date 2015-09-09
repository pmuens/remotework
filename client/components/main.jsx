MainLayout = React.createClass({
  render() {
    return (
      <div>
        <Header />
        {this.props.component}
        <Footer />
      </div>
    );
  }
});
