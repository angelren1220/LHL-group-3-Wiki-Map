$(() => {
  $.ajax({
    method: 'GET',
    url: '/maps/user_list'
  })
    .then((data) => {
      const $mapsList = $('#maps');
      $mapsList.empty();

      for (const map of data) {
        $(`<li class="maps">`).text(`${map.id}, ${map.name}`).appendTo($mapsList);
      }
    });

});
