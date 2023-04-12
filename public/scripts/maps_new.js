$(() => {
  $.ajax({
    method: 'GET',
    url: '/maps/api/new'
  })
    .then((data) => {
      const userId = data.id;
    })
    .catch((err) => {
      console.log(err);
    });

});
