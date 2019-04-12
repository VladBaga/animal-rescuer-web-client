window.AnimalRescuer = {

    apiUrl: "http://localhost:8082/top-rescuers",

    add: function () {
        var name = $("input[title='Name']").val();
        var rescuedAnimalName = $("input[title='Animal Name']").val();
        var wonGames = $("input[title='WonGames']").val();
        var data = {
            'name': name,
            'rescuedAnimalName': rescuedAnimalName,
            'wonGames': wonGames
        };

        $.ajax(
            {
                url: AnimalRescuer.apiUrl,
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            }).done(function (response) {
            console.log(response);
            //reload items table
            AnimalRescuer.load(response);
        });
    },

    getItemRow: function (item) {
        return `<tr>
 <td class="name">${item.name}</td>
 <td class="rescuedAnimalName">${item.rescuedAnimalName}</td>
 <td class="wonGames">${item.wonGames}</td>
   <td><a href="#" class="fa fa-trash delete" data-id="${item.id}"></a></td>
   <td><a href="#" class="fa fa-edit put" data-id="${item.id}"></a></td>
</tr>`
    },

    displayItems: function(items){
        console.log('Displaying top-rescuers...');
        var rows = '';

        items.forEach(item => rows += AnimalRescuer.getItemRow(item));

        console.log(rows);

        $('#animal-rescuers body').html(rows);
    },

    load: function () {
        $.ajax(
            {
                url: AnimalRescuer.apiUrl,
                method: "GET"
            }).done(function (response) {
            console.log(response);
            //reload items table

            AnimalRescuer.displayItems(response)
        });
    },

    delete: function(id){
        $.ajax(
            {
                url: AnimalRescuer.apiUrl + '?id=' + id,
                method: "DELETE"
            }).done(function (response) {
            console.log(response);
            //reload item table

            AnimalRescuer.load(response);
        });
    },

    update: function(id){

        var name = $("input[title='Name']").val();
        var rescuedAnimalName = $("input[title='RescuedAnimalName']").val();
        var wonGames = $("input[title='WonGames']").val();
        var data = {
            'name': name,
            'rescuedAnimalName': rescuedAnimalName,
            'wonGames': wonGames,
        };
        $.ajax(
            {
                url: AnimalRescuer.apiUrl + '?id=' + id,
                method: "PUT",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            }).done(function (response) {
            console.log(response);
            //reload items table

            AnimalRescuer.load(response);
        });
    },

    bindEvents: function () {

        $("#create-animal-rescuer-form").submit(function (event) {
            event.preventDefault();

            console.log('Submitting animal rescuer form');

            AnimalRescuer.add();

            return false;
        });

        $('#animal-rescuers tbody').delegate('.delete', 'click', function () {
            var id = $(this).data('id');

            AnimalRescuer.delete(id);
        });

        $('#animal-rescuers tbody').delegate('.put', 'click', function () {
            var id = $(this).data('id');

            AnimalRescuer.update(id);
        });
    }

};
AnimalRescuer.load();
AnimalRescuer.bindEvents();