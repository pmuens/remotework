setTitle = (title) => {
  let base = 'Remote Work';

  if (title) {
    return document.title = `${title} - ${base}`;
  }
  return document.title = base;
};
