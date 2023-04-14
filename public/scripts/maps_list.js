$(() => {
  $.ajax({
    method: 'GET',
    url: '/maps/api/list'
  })
    .then((data) => {
      const $mapsList = $('#maps');
      $mapsList.empty();

      for (const map of data) {
        $(`<a>`).text(`id: ${map.id}, name: ${map.name} View Map`).attr("href", `/maps/${map.id}`).addClass('black').appendTo($mapsList);
        $(`<form method="POST" action="/maps/delete/${map.id}"><button type="submit">Delete Map </button> </form>`).appendTo($mapsList);
        $(`<form method="GET" action="/maps/${map.id}/pins"><button type="submit">Pins</button> </form>`).appendTo($mapsList);
      }
    })
    .catch((err) => {
      console.log(err);
    });

});
