
$.ajax({
  url: '/users/verify',
  success: function(data) {
    console.log('🥂', data);
    return data;
  }
});

