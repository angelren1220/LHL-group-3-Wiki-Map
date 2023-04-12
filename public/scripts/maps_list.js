$(() => {
  $.ajax({
    method: 'GET',
    url: '/maps/api/list'
  })
    .then((data) => {
      const $mapsList = $('#maps');
      $mapsList.empty();

      for (const map of data) {
        $(`<a>`).text(`id: ${map.id}, zoom; ${map.zoom}, name: ${map.name}`).attr("href", `/maps/${map.id}`).addClass('black').appendTo($mapsList);
      }
    })
    .catch((err) => {
      console.log(err);
    });

});
