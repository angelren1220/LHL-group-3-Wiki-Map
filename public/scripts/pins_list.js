$(() => {
  const url = window.location.pathname.split('/')[2];
  const id = url[0];

  $.ajax({
    method: 'GET',
    url: `/maps/api/${id}/pins`,
  })
    .then((data) => {
      const $pinsList = $('#pins');
      $pinsList.empty();

      for (const pins of data) {
        $(`<li>`).text(`id: ${pins.id}, name: ${pins.name}`).addClass('black').appendTo($pinsList);
      }

      $('.new-pin-form').attr('action', `/maps/${id}/pins/new`);


    })
    .catch((err) => {
      console.log(err);
    });
});
