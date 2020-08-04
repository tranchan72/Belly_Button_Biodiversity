// Creates a dropdown menu of ID numbers
function init() {
  var selector = d3.select("#selDataset");
  
  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  })}
  
  init();
// To log option to browser console
// function optionChanged(newSample) {
//     console.log(newSample);}

// Print information to the Demographic Info panel
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
  buildBubbleCharts(newSample);
  buildGauge(newSample);
}
// Declare function buildMetadata
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var resultAsObject = resultArray[0];
    var resultAsPair = Object.entries(resultAsObject);
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    var result = [ resultAsPair.forEach(([key, value]) => {
      console.log(key, value)
      PANEL.append("h6").text(key.toUpperCase() + ": " + value);
    })];
  });  
}  
//   var strID = "ID: ";
//   var res = strID.concat(result.id);         
//   PANEL.append("h6").text(res);

// Build Bar Chart
function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.samples;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var bacteria = resultArray.map(sampleValue => sampleValue.sample_values);
    var x = bacteria[0].slice(0, 10).reverse();
    console.log(x)
    var bacteriaName = resultArray.map(otuID => otuID.otu_ids);
    var yBacteriaName = bacteriaName[0].slice(0, 10).reverse();
    console.log(yBacteriaName)
    var y = yBacteriaName.map(i => "OTU" + i);
    var trace = {
      x: x,
      y: y,
      type: "bar",
      orientation: "h"
    };
    var PANEL = d3.select("#bar");
    PANEL.html("");
    Plotly.newPlot("bar", [trace]);
  }
)}

// Build BubbleCharts
function buildBubbleCharts(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.samples;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var x = resultArray[0].otu_ids;
    console.log(x)
    var y = resultArray[0].sample_values;
    console.log(y)
    // var y = yBacteriaName.map(i => "OTU" + i);
    var trace = {
      x: x,
      y: y,
      interval: 500,
      mode: 'markers',
      marker: {
        color: x,
        size: y,
        colorscale: 'Earth'
      },        
    };
    var layout = {
      title: "OTU ID"
    };
    var PANEL = d3.select("#bubble");
    PANEL.html("");
    Plotly.newPlot("bubble", [trace], layout);
  }
)}

// Build Gauge Chart
function buildGauge(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    washFreq = resultArray[0].wfreq;
    console.log(washFreq)

    // Level between 1 and 9 of wash frequency
    var level = washFreq;

    // Trig to calc meter point. Degrees calculated accordingly to level
    var degrees = 180-(level*20);
    alert(degrees);
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);
    var trace = [
      {type: 'scatter',
      x: [0],
      y: [0],
      text: level,
      name: 'Wash Freq: ',
      hoverinfo: 'text+name',
      marker: {
        size: 28,
        color: '850000'
        },
      showlegend: false},
      {values: [
        50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9,
        50],
      rotation: 90,
      text: [ "8-9", "7-8","6-7","5-6","4-5","3-4","2-3","1-2","0-1",     
        ""],
      textinfo: "text",
      textposition: "inside",
      marker: {colors:[ 'rgba(231, 99, 250)',
                'rgb(17, 157, 255)',
                'rgba(14, 127, 0, .5)',                        
                'rgba(110, 154, 22, .5)',
                'rgba(170, 202, 42, .5)',
                'rgba(202, 209, 95, .5)',
                'rgba(210, 206, 145, .5)',
                'rgba(249, 168, 37, .5)',                
                'rgba(183,28,28, .5)',                                        
                'rgba(255, 255, 255, 0)']},
      labels: [
        "0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9",
        ""],
      hoverinfo: "label",
      hole: .55,
      type: "pie",
      showlegend: false}
    ]
    
    var layout = {
      shapes:[{
        type:'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
      title: "Belly Button Washing Frequency <br> Scrubs per Week",
      height: 500,
      width: 600,
      xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
    }
    var PANEL = d3.select("#gauge");
    PANEL.html("");
    Plotly.newPlot("gauge", trace, layout);   
  }
)};  
 
  