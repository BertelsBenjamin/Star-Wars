(function ($) {
    //VARIABLES
    let arrPlanets = [];
    let mustHaveKeys = ['name', 'climate', 'diameter', 'gravity', 'orbital_period', 'population', 'residents', 'rotation_period', 'surface_water', 'terrain', 'created'];
    let planetKeys = [];
    let arrResidentsLinks = [];
    let arrResidents = [];

    //FUNCTIONS

            function getData(url){
                    $.getJSON(url)
                        .done(function (planets){
                            getData(planets.next);
                            for(i=0; i<planets.results.length;i++){
                                arrPlanets.push(planets.results[i]);
                            }
                            
                            if (arrPlanets.length===61){
                                console.log(arrPlanets);
                                for (i=0; i<arrPlanets.length;i++) {
                                        arrResidentsLinks.push(arrPlanets[i].residents);
                                }
                                console.log(arrResidentsLinks);
                                for(let k=0; k<arrResidentsLinks.length; k++){
                                    for(let l=0; l<arrResidentsLinks[k].length; l++){
                                        $.getJSON(arrResidentsLinks[k][l])
                                        .done(function(residents){
                                            addRowsAndColumnsToTDs();
                                            $.getJSON($('.column-6').html())
                                            .done(function(residents){
                                                
                                            })
                                            .fail(function (jqxhr, textStatus, error) {
                                                var err = textStatus + ", " + error;
                                                console.log("Request Failed: " + err);
                                            });
                                        })
                                        .fail(function (jqxhr, textStatus, error) {
                                            var err = textStatus + ", " + error;
                                            console.log("Request Failed: " + err);
                                        });
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

            for (i=0, j=1; i<$('tr').children().length, j<arrPlanets.length; i++, j++){
                console.log($('td:nth-child(' + j + ')'));
                $('td:nth-child(' + j + ')').addClass($('td:nth-child(' + j + ')').parent().attr('id'));
                $('td:nth-child(' + j + ')').addClass('column-' + i);
            }
        }

    //DOCUMENT READY
    $(document).ready(function () {
        getData("https://swapi.co/api/planets/");
    })
})(jQuery);