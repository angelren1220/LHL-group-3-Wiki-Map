$(() => {
  $.ajax({
    method: 'GET',
    url: '/maps/api/list'
  })
    .then((data) => {
      const $mapsList = $('#maps');
      $mapsList.empty();

      for (const map of data) {
        $(`<a>`).text(`id: ${map.id}, name: ${map.name}`).attr("href", `/maps/${map.id}`).addClass('black').appendTo($mapsList);
        $(`<form method="POST" action="/maps/delete/${map.id}"><button type="submit">Delete Map </button> </form>`).appendTo($mapsList);
      }
    })
    .catch((err) => {
      console.log(err);
    });

});
