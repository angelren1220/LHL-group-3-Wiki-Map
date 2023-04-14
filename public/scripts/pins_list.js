$(() => {
  const myUrl = window.location.pathname.split('/')[2];
  const myUrl1 = myUrl[0];

  $.ajax({
    method: 'GET',
    url: `/maps/api/${myUrl1}/pins`,
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
