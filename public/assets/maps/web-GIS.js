var overlayers = {}
var options = {
    container_width: "230px",
    group_minHeight: "100px",
    //container_maxHeight : "350px",
    exclusive: true,
    collapsed: false
};

function getMax(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

function drawBarChart(divId, datas) {
	am5.ready(function() {

		// Create root element
		// https://www.amcharts.com/docs/v5/getting-started/#Root_element
		var root = am5.Root.new(divId);


		// Set themes
		// https://www.amcharts.com/docs/v5/concepts/themes/
		root.setThemes([
		  am5themes_Animated.new(root)
		]);


		// Create chart
		// https://www.amcharts.com/docs/v5/charts/xy-chart/
		var chart = root.container.children.push(am5xy.XYChart.new(root, {
		  panX: true,
		  panY: true,
		  wheelX: "panX",
		  wheelY: "zoomX",
		  pinchZoomX: true
		}));

		// Add cursor
		// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
		var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
		cursor.lineY.set("visible", false);


		// Create axes
		// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
		var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
		xRenderer.labels.template.setAll({
		  rotation: -90,
		  centerY: am5.p50,
		  centerX: am5.p100,
		  paddingRight: 15
		});

		xRenderer.grid.template.setAll({
		  location: 1
		})

		var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
		  maxDeviation: 0.3,
		  categoryField: "nom_parti",
		  renderer: xRenderer,
		  tooltip: am5.Tooltip.new(root, {})
		}));

		var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
		  maxDeviation: 0.3,
		  renderer: am5xy.AxisRendererY.new(root, {
			strokeOpacity: 0.1
		  })
		}));


		// Create series
		// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
		var series = chart.series.push(am5xy.ColumnSeries.new(root, {
		  name: "Series 1",
		  xAxis: xAxis,
		  yAxis: yAxis,
		  valueYField: "votants",
		  sequencedInterpolation: true,
		  categoryXField: "nom_parti",
		  tooltip: am5.Tooltip.new(root, {
			labelText: "{valueY}"
		  })
		}));

		series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
		series.columns.template.adapters.add("fill", function(fill, target) {
			//console.log(target.dataItem.dataContext.couleur_parti)
		  return am5.color(target.dataItem.dataContext.couleur_parti);
		});

		series.columns.template.adapters.add("stroke", function(stroke, target) {
		  return chart.get("colors").getIndex(series.columns.indexOf(target));
		});


		// Set data
		//console.log(datas)
		var data = datas;

		xAxis.data.setAll(data);
		series.data.setAll(data);


		// Make stuff animate on load
		// https://www.amcharts.com/docs/v5/concepts/animations/
		series.appear(1000);
		chart.appear(1000, 100);

	})
}

$.ajax({
    url: base_path + "get_decoupages_electoraux",
    type: 'GET',
    dataType: 'json',
    async: false,
    success: function(data) {
        // console.log(data.total);

        var layer = JSON.parse(data.decoupages_electoraux[0].geom)
        // console.log(layer)
        var layer_geojson = L.geoJson(layer, {
            style: function(f) {
                // console.log(f.properties)
                var votants_decoupages = data.votants.filter(function (entry) {
                    return entry.decoupage === f.properties.decoupage;
                });
                // console.log(votants_decoupages)
                var max_votant_color = '#1E90FF';
                if(votants_decoupages.length != 0) {
                    max_votant_color = getMax(votants_decoupages, 'votants').couleur_parti;
                }
                return { color: max_votant_color, weight: 4, fillColor: max_votant_color, fillOpacity: .4 };
            },
            onEachFeature: function(f, l) {
                var output = '';
                var total_sieges = data.total.filter(function (entry) {
                    return entry.decoupage === f.properties.decoupage;
                });

                // console.log(f.properties)
				var votants_decoupages = data.votants.filter(function (entry) {
                    return entry.decoupage === f.properties.decoupage;
                });
				var max_votant = getMax(votants_decoupages, 'votants');
				// console.log(max_votant)

                if (f.properties) {
                    output += `<b class="data_name"><u>${f.properties.Commune}</u> </b></br></br>`;
                    if(total_sieges.length != 0) {
                        output += `<b class="data_name">Total Inscrits: ${total_sieges[0].inscrits} </b></br>`;
                        output += `<b class="data_name">Total Votants: ${total_sieges[0].votants} </b></br>`;
                        output += `<b class="data_name">Abstensions: ${total_sieges[0].abstensions} </b></br>`;
                        output += `<b class="data_name">Bulletins blancs: ${total_sieges[0].bulletins_blancs} </b></br>`;
                    }
					data.votants.sort((a, b) => b.votants - a.votants);
                    $.each(data.votants, function(key, value) {
                        if (f.properties.decoupage === value.decoupage) {
							var pourcentageParti = (value.votants / total_sieges[0].inscrits) * 100;
							if(max_votant.nom_parti === value.nom_parti) {
								output += `<b class="data_name" style="background-color:${max_votant.couleur_parti}; color:#ffffff;">${value.nom_parti} : ${value.votants} (${ pourcentageParti.toFixed(2)}%) </b></br>`;
							} else {
								output += `<b class="data_name">${value.nom_parti} : ${value.votants} (${ pourcentageParti.toFixed(2)}%) </b></br>`;
							}
                        }
                    })
					
					output += `<div class='chartdiv' id="${f.properties.decoupage}"></div>`;
                    l.bindPopup(output);
                }
				l.on('click', function (e) {
				  // e = event
				  // console.log(e);
				  votants_decoupages.sort((a, b) => b.votants - a.votants);
				  drawBarChart(f.properties.decoupage, votants_decoupages) 
				});


            }
        })
        layer_geojson.addData(layer);
        mymap.fitBounds(layer_geojson.getBounds());
        layer_geojson.addTo(mymap)
        overlayers['Découpages électoraux'] = layer_geojson;

    }
})

$.ajax({
    url: base_path + "get_sieges_electoraux",
    type: 'GET',
    dataType: 'json',
    async: false,
    success: function(data) {
        // console.log(data.total);
        var layer = JSON.parse(data.sieges_electoraux[0].geom)
        // console.log(layer)
        var layer_geojson = L.geoJson(layer, {
            style: function(f) {
                var sieges = data.votants.filter(function (entry) {
                    return entry.siege === f.properties.id_siege;
                });
                // console.log(sieges)
                var max_votant_color = getMax(sieges, 'votants').couleur_parti
                // console.log(max_votant_color)
                return { color: max_votant_color, weight: 2, fillColor: max_votant_color, fillOpacity: .1 };
            },
            onEachFeature: function(f, l) {
                var output = '';
                var total_sieges = data.total.filter(function (entry) {
                    return entry.id_siege === f.properties.id_siege;
                });

                // console.log(total_sieges[0])

                if (f.properties) {
					
					var sieges = data.votants.filter(function (entry) {
						return entry.siege === f.properties.id_siege;
					});
					// console.log(sieges)
					var max_votant = getMax(sieges, 'votants')
					
                    output += `<b class="data_name"><u>${f.properties.Nom}</u> </b></br></br>`;
                    output += `<b class="data_name">Total Inscrits: ${total_sieges[0].inscrits} </b></br>`;
                    output += `<b class="data_name">Total Votants: ${total_sieges[0].votants} </b></br>`;
                    output += `<b class="data_name">Abstensions: ${total_sieges[0].abstensions} </b></br>`;
                    output += `<b class="data_name">Bulletins blancs: ${total_sieges[0].bulletins_blancs} </b></br>`;
					data.votants.sort((a, b) => b.votants - a.votants);
                    $.each(data.votants, function(key, value) {
                        if (f.properties.id_siege === value.siege) {
                            var pourcentageParti = (value.votants / total_sieges[0].inscrits) * 100;
							if(max_votant.nom_parti === value.nom_parti) {
								output += `<b class="data_name" style="background-color:${max_votant.couleur_parti}; color:#ffffff;">${value.nom_parti} : ${value.votants} (${ pourcentageParti.toFixed(2)}%) </b></br>`;
							} else {
								output += `<b class="data_name">${value.nom_parti} : ${value.votants} (${ pourcentageParti.toFixed(2)}%) </b></br>`;
							}
                            // output += `<b class="data_name">${value.nom_parti} : ${value.votants} (${ pourcentageParti.toFixed(2)}%) </b></br>`;
                        }
                    });
					output += `<div class='chartdiv' id="${f.properties.siege}"></div>`;
                    l.bindPopup(output);
                }
				l.on('click', function (e) {
				  // e = event
				  // console.log(e);
				  sieges.sort((a, b) => b.votants - a.votants);
				  drawBarChart(f.properties.siege, sieges) 
				});


            }
        })
        layer_geojson.addData(layer);
        // mymap.fitBounds(layer_geojson.getBounds());
        layer_geojson.addTo(mymap)
        overlayers['Sièges électoraux'] = layer_geojson;

    }
})

$.ajax({
    url: base_path + "get_bureaux_votes",
    type: 'GET',
    dataType: 'json',
    async: false,
    success: function(data) {
        // console.log(data.votants);
        var layer = JSON.parse(data.bureaux_votes[0].geom)
            // console.log(layer)
        var layer_geojson = L.geoJson(layer, {
            pointToLayer: function(feature, latlng) {
                var bureaux = data.votants.filter(function (entry) {
                    return entry.code_bureau === feature.properties.code_bv;
                });
                // console.log(bureaux)
                // console.log(getMax(bureaux, 'votants').couleur_parti)
                var max_votant_color = getMax(bureaux, 'votants').couleur_parti
                return L.circleMarker(latlng, {
                    radius: 8,
                    fillColor: max_votant_color,
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            },
            // filter: function(feature) {


            //     return bureaux;
            // },
            onEachFeature: function(f, l) {
                var output = '';


                if (f.properties) {
					var bureaux = data.votants.filter(function (entry) {
						return entry.code_bureau === f.properties.code_bv;
					});
					var max_votant = getMax(bureaux, 'votants')
					
                    output += `<b class="data_name"><u>${f.properties.bureau_vote}</u> </b></br></br>`;
                    output += `<b class="data_name">Total Inscrits: ${f.properties.total_inscrits} </b></br>`;
                    output += `<b class="data_name">Total Votants: ${f.properties.total_votants} </b></br>`;
                    output += `<b class="data_name">Abstensions: ${f.properties.abstensions} </b></br>`;
                    output += `<b class="data_name">Bulletins blancs: ${f.properties.bulletins_blancs} </b></br>`;
					data.votants.sort((a, b) => b.votants - a.votants);
                    $.each(data.votants, function(key, value) {
                        if (f.properties.code_bv === value.code_bureau) {
                            var pourcentageParti = (value.votants / f.properties.total_inscrits) *100;
                            if(max_votant.nom_parti === value.nom_parti) {
								output += `<b class="data_name" style="background-color:${max_votant.couleur_parti}; color:#ffffff;">${value.nom_parti} : ${value.votants} (${ pourcentageParti.toFixed(2)}%) </b></br>`;
							} else {
								output += `<b class="data_name">${value.nom_parti} : ${value.votants} (${ pourcentageParti.toFixed(2)}%) </b></br>`;
							}
                        }
                    });
					output += `<div class='chartdiv' id="${f.properties.code_bv}"></div>`;
                    l.bindPopup(output);
                }
				
				l.on('click', function (e) {
				  // e = event
				  // console.log(e);
				  bureaux.sort((a, b) => b.votants - a.votants);
				  drawBarChart(f.properties.code_bv, bureaux) 
				});


            }
        })
        layer_geojson.addData(layer);
        // mymap.fitBounds(layer_geojson.getBounds());
        layer_geojson.addTo(mymap)
        overlayers['Bureaux de vote'] = layer_geojson;

    }
})

var control1 = L.control.layers(null, overlayers, options)
mymap.addControl(control1);

/*Legend specific*/
var legend = L.control({ position: "topleft" });
var div = L.DomUtil.create("div", "legend");
div.innerHTML += "<h4>Legende</h4>";
div.innerHTML += `<i style="background: #A52A2A"></i><span>Parti 1</span><br>`;
div.innerHTML += `<i style="background: #D2691E"></i><span>Parti 2</span><br>`;
div.innerHTML += `<i style="background: #A9A9A9"></i><span>Parti 3</span><br>`;
div.innerHTML += `<i style="background: #FF1493"></i><span>Parti 4</span><br>`;
legend.onAdd = function(map) {
    return div;
};

legend.addTo(mymap);
