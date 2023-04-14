$(() => {
  $.ajax({
    method: 'GET',
    url: '/maps/api/:id/pins'
  })
    .then((data) => {
      const $pinsList = $('#pins');
      $pinsList.empty();

      for (const pins of data) {
        $(`<li>`).text(`id: ${pins.id}, name: ${pins.name}`).addClass('black').appendTo($pinsList);
      }
    })
    .catch((err) => {
      console.log(err);
    });

});
