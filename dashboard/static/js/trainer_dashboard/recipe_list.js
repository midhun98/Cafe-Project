$(document).ready(function () {

    let invoicesTable = $('#uploaded-recipe-table').DataTable({
        "processing": true,
        "serverSide": true,
        "searching": false,

        "ajax": {
            "url": "/api/foods/my_foods/",
            "data": function (data) {
                return {
                    page: (data.start / data.length) + 1,
                    page_size: data.length,
                    ordering: data.order[0].dir
                };
            },
            "dataSrc": function (json) {
                json.recordsTotal = json.count;
                json.recordsFiltered = json.count;
                return json.results;
            }
        },
        "columns": [
            {
                "data": "recipe_name", "title": 'Dish Name',
                "render": function (data, type, row) {
                    return '<div class="d-flex px-2 py-1">' +
                        '<div><img src="https://img.icons8.com/papercut/60/pizza.png" class="avatar avatar-sm me-3" alt="user1"></div>' +
                        '<div class="d-flex flex-column justify-content-center">' +
                        '<h6 class="mb-0 text-sm">' + data + '</h6></div></div>';
                }
            },
            {
                "data": "meal_category", "title": 'Type',
                "render": function (data, type, row) {
                    return '<p class="text-xs font-weight-bold mb-0">' + data + '</p>';
                }
            },
            {
                "data": null, "title": 'Recipe',
                "render": function (data, type, row) {
                    return '<span class="badge badge-sm bg-gradient-success">Link</span>';
                }
            },
            {
                "data": null, "title": 'Modify',
                "render": function (data, type, row) {
                    return '<a href="" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">Edit</a>';
                }
            }
        ],
    });
});