
$('#save_car').on("submit", function(e){
    e.preventDefault();

    db.collection('cars').add({
        model: $("#grid-model").val(),
        name:  $("#grid-name").val(),
        year:  $("#grid-year").val(),
    }).then(function(){
        index();

        $("#grid-model").val("");
        $("#grid-name").val("");
        $("#grid-year").val("");
    });
});

$(document).on('click', '.delete_car', function(e){
    db.collection('cars').doc(this.id).delete().then(function(){
        index();
    })
})

function index(){
    document.getElementById('car_tbody').innerHTML = "";

    db.collection('cars').get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
        $('#car_table').find('tbody')
        .append(
            "<tr><td class='border px-4 py-2 text-center'>" + doc.data().name + "</td><td class='border px-4 py-2 text-center'>" +
            doc.data().model + "</td><td class='border px-4 py-2 text-center'>"
            + doc.data().year + "</td>+<td class='border px-4 py-2 text-center'>" +
            "<button id='"+doc.id+"' " +
            "class = 'delete_car shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>Delete</button></td></tr>"
            );
    });
  });
}


index();
