(function ($) {
    //VARIABLES
    let arrPlanets = [];
    let mustHaveKeys = ['name', 'climate', 'diameter', 'gravity', 'orbital_period', 'population', 'residents', 'rotation_period', 'surface_water', 'terrain', 'created'];
    let planetKeys = [];
    let arrResidents = [];

    //FUNCTIONS

        function getData(url){
                $.getJSON(url)
                    .done(function (planets){
                        getData(planets.next);
                        for(i=0; i<planets.results.length;i++){
                            arrPlanets.push(planets.results[i]);
                        }
                        console.log(arrPlanets);
                        if (arrPlanets.length===61){
                            for (i=0; i<arrPlanets.length;i++) {
                                    arrResidents.push(arrPlanets[i].residents);
                            }
                            console.log(arrResidents);
                            for(i<0; i<arrResidents.length; i++){
                                for(j=0; j<arrResidents[i].length; j++){
                                    getData(arrResidents[i][j]);
                                }
                            }
                            fillTable();
                        }
                    })
                    .fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ", " + error;
                        console.log("Request Failed: " + err);
                    });
        }

        function fillTable(){
            //FILL TABLE HEAD
            planetKeys = Object.keys(arrPlanets[0]);
            for (i=0; i<mustHaveKeys.length; i++){
                  for (j=0; j<planetKeys.length; j++){
                      if (mustHaveKeys[i]===planetKeys[j]){
                          $('#thead').append('<th id="th-' + mustHaveKeys[i] + '">' + mustHaveKeys[i] + '</th>');
                      }
                  }
            }
            //FILL TABLE BODY
            for (i=0; i<arrPlanets.length; i++){
                $('#tbody').append('<tr></tr>');
            }

            $('tr').each(function(i, e){
                $(e).attr('id', 'row-' + i);
            });

            for (i=0; i<mustHaveKeys.length; i++){
                for (j=0; j<arrPlanets.length; j++) {
                    $('#row-' + j).append('<td>' + arrPlanets[j][mustHaveKeys[i]] + '</td>')
                }
            }
        }

        function addRowsAndColumnsToTDs(){
            $('tr').each(function(i, e){
                $(e).attr('id', 'row-' + i);
            });

            $('td').each(function(i, e){
                $(e).addClass(e.parentElement.getAttribute('id'));
            });

            for (i=0, j=1; i<11, j<11; i++, j++){
                $('td:nth-child(' + j + ')').addClass('column-' + i);
            }
        }

    //DOCUMENT READY
    $(document).ready(function () {
        getData("https://swapi.co/api/planets/");
        addRowsAndColumnsToTDs();

    })
})(jQuery);