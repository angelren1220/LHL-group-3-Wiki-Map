$(() => {
  $.ajax({
    method: 'GET',
    url: '/maps/api/list'
  })
    .then((data) => {
      const $mapsList = $('#maps');
      $mapsList.empty();

      for (const map of data) {
        const $mapDiv = $('<div>').addClass('list-buttons'); // Add a div element with class 'list-buttons'
        $(`<form method="POST" action="/maps/delete/${map.id}"><button type="submit">Delete Map</button></form>`).appendTo($mapDiv);
        $(`<form method="GET" action="/maps/${map.id}/pins"><button type="submit" class="viewpins">Pins</button></form>`).appendTo($mapDiv);
        const $mapLink = $(`<a>`).text(`id: ${map.id}, name: ${map.name} View Map`).attr("href", `/maps/${map.id}`).addClass('black');
        $mapsList.append($mapLink).append($mapDiv); // Append the "View Map" link and the "Delete Map" and "Pins" buttons separately
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

