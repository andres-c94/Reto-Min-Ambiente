require(["esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Locate",
    "esri/tasks/Locator"], function (esriConfig, Map, MapView, Locate, Locator) {

        esriConfig.apiKey = "AAPK167f596c5f384bc7be631368a37ec48dmFf5qMXzasaWJtCwDR8fx4dfjNfgZ3ik0aWALYhWhrWMpaUe40UT1MwF_skD_Xd0";

        //CREAR UN NUEVO MAPA 
        const map = new Map({
            basemap: "arcgis-navigation"
        });

        //CREAR LA VISTA DEL MAPA 
        const view = new MapView({
            container: "map8",
            map: map,
            zoom: 4,
            center: [-74.0817500, 4.6097100]
        });

        //FUNCION DE LOCALIZACION
        const locate = new Locate({

            view: view,
            useHeadingEnabled: false,
            goToOverride: function (view, options) {
                options.target.scale = 4500;
                return view.goTo(options.target);
            }
        });

        view.ui.add(locate, "top-left");



        //LOCALIZACION INVERESA 
        
        const locatorTask = new Locator({
            url: "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer"
        })

        view.on("click", function (evt) {
            const params = {
                location: evt.mapPoint
            };

            locatorTask.locationToAddress(params)
                .then(function (response) { // Show the address found
                    const address = response.address;
                    showAddress(address, evt.mapPoint);
                }, function (err) { // Show no address found
                    showAddress("No address found.", evt.mapPoint);
                });

        });

        function showAddress(address, pt) {
            view.popup.open({
                title: + Math.round(pt.longitude * 100000) / 100000 + " , " + Math.round(pt.latitude * 100000) / 100000,
                content: address,
                location: pt
            });

            let lg = Math.round(pt.longitude * 100000) / 100000;
            let lt = Math.round(pt.latitude * 100000) / 100000;

            document.getElementById("lg").value = lg;
            document.getElementById("lt").value = lt;



            //alert("Longitud: "+lg+"   "+"Latitud: "+lt);
        }







    });