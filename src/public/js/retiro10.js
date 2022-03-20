document.addEventListener("DOMContentLoaded", function (event) {
    function consultarData(data) {
        const url = `http://localhost:9000/rest/msdxc/dxc?sueldo=${data.sueldo}&ahorro=${data.ahorro}`;
        return axios.get(url, data).then((response) => {
            console.log('response.data: ', response.data);
            return response.data;
        });
    }
    function tablaData(data) {
        $('.tb-retiro10').html('')

        $('.tb-retiro10').append(`<tr><td>${data.dxc}</td><td>${data.saldo}</td><td>${data.impuesto}</td><td>${data.sueldo}</td><td>${data.ahorro}</td></tr>`)

    }
    function clearForm() {
        $('#js-sueldo').val('');
        $('#js-ahorro').val('');
        $('.tb-retiro10').append('');
    }

    $("button.js-consultar").on('click', (e) => {
        e.preventDefault();
        var data = {}
        data.sueldo = $('#js-sueldo').val();
        data.ahorro = $('#js-ahorro').val();

        if (!data.sueldo) {
            $('#js-sueldo').addClass('is-invalid');
        } else {
            $('#js-sueldo').removeClass('is-invalid');
        }
        if (!data.ahorro) {
            $('#js-ahorro').addClass('is-invalid');
        } else {
            $('#js-ahorro').removeClass('is-invalid');
        }

        if (!data.sueldo || !data.ahorro) {
            e.preventDefault();
            //TODO toast indicando error
            $('#alertFormCU').html('Falta información por completar o el formato es incorrecto');
            $('#alertFormCU').show()
        } else {
            consultarData(data).then((result) => {
                clearForm()
                tablaData(result);
                $('#alertFormCU').hide();
            }).catch((e) => {
                //todo toast indicando error
            })
        }
    });
    $("button.js-limpiar").on('click', (e) => {
        e.preventDefault();
        clearForm();
    });
})
