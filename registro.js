const apiKey = "AAPK784be6f1c1b74be2853583d7fa55e1dcj3DcpyvdggcRMAb2Q-BrTT_EvWo6qUprnaeQkiIad0RKx9Swsol-Rd6RnM6QdHyn";

const authentication = new arcgisRest.ApiKey({
    key: apiKey
});

(() => {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!form.checkValidity()) {
                console.log("validando")
                event.stopPropagation();
                event.preventDefault();
                form.classList.add('was-validated');
            } else {
                request();
            }
        }, false);
    });
})();


const request = () => {
    const featureServiceLayerUrl = "https://services.arcgis.com/8DAUcrpQcpyLMznu/arcgis/rest/services/service_7d1e8eafcaaa40bfa3fbe6608ff173ec/FeatureServer/0";

    form.classList.add('was-validated');
    console.log("Estoy aqui")
    var featureToAdd = {
        attributes: {
            Nombre: document.querySelector("#nombre").value,
            Apellido: document.querySelector("#apellidos").value,
            NumIdentif: document.querySelector("#iden").value,
            Edad: document.querySelector("#edad").value,
            Correo: document.querySelector("#email").value,
            CuandoSembro: document.querySelector("#fecha1").value,
            QueSembro: null,
            //Fecha: '13/05/2021',
            Especie: document.querySelector("#especie").value,
            NumArboles: document.querySelector("#cantidad").value,
            DondeSembro: null,
            Departamento: document.querySelector("#depart").value,
            Municipio1: document.querySelector("#muni").value,
            CentroPoblado: document.querySelector("#cpoblado").value,
            Evidencia: document.querySelector("#fileImage").value,
            Comentarios: null,
            Observaciones: document.querySelector("#exampleFormControlTextarea1").value,
            Nota: null,
            Nota2: null,
            Nota3: null,
            NotaPolitica: null,
            PoliticaPriva: null,
            Nota5: null,
            TipoPersona: null,
            CreationDate: null,
            Creator: null,
            EditDate: null,
            Editor: null
        },



        geometry: {
            x: document.querySelector("#lg").value,
            y: document.querySelector("#lt").value,
            spatialReference: {
                wkid: 4326
            }
        }
    };

    arcgisRest.addFeatures({
        url: featureServiceLayerUrl,
        features: [featureToAdd],
        authentication
    })
        .then(handleAdded);

    function handleAdded(response) {
        console.log(response);

        if (!response.addResults[0].success) {
            // stop early if adding a new feature was not successful
            return;
        }

        alert("Se ha realizado el registro exitosamente");

    }


}