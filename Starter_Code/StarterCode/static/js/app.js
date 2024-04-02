const bbdata = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

function setup() {
   let dropDown = d3.select("#selDataset");
   d3.json(bbdata).then(function(data) {
       
    let sampleNames = data.names;
    
    sampleNames.forEach((name) => {
         dropDown.append("option")
         .text(name)
         .property("value", name);
       });
          console.log(sampleNames);
          
          let initialSample = sampleNames[0]
            barPlot(initialSample);
            bubblePlot(initialSample);
            demoInfo(initialSample);
    });
};

setup();

function demoInfo (sampleID) {
  d3.json(bbdata).then(function(data) {

      let metadata = data.metadata;
      console.log(metadata);

      let sampleArray = metadata.filter(sample => sample.id == sampleID);
      let sample = sampleArray[0];

      let card = d3.select("#sample-metadata");
      card.html("");

      for (key in sample) {
          card.append("h6").text(key+": "+sample[key])
      };
  });
};


function barPlot (sampleID) {
  d3.json(bbdata).then(function(data) {
  
  let samples = data.samples;
  console.log(samples);

  let sampleArray = samples.filter(sample => sample.id == sampleID);
  let sample = sampleArray[0];

  let otu_ids = sample.otu_ids
  let sample_values = sample.sample_values
  let otu_labels = sample.otu_labels


  let trace1 = [
      {x: sample_values.slice(0,10).reverse(),
      y: otu_ids.slice(0,10).map(otu_id => "OTU "+otu_id).reverse(),
      text: otu_labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h",
      marker:{
        color:"#6211D8"}
      }
  ];

  let layout = {
      title:""
  };

  Plotly.newPlot("bar", trace1, layout);

  });
};


function bubblePlot (sampleID) {
  d3.json(bbdata).then(function(data) {

  let samples = data.samples;

  let sampleArray = samples.filter(sample => sample.id == sampleID);
  let sample = sampleArray[0];

  let otu_ids = sample.otu_ids
  let sample_values = sample.sample_values
  let otu_labels = sample.otu_labels

  let trace2 = [
      {x: otu_ids,
       y: sample_values,
       text: otu_labels,
       mode:"markers",
       marker:{
          size: sample_values,
          color: otu_ids,
          colorscale: "Bluered"
       }

      }];

  let layout = {
      xaxis: {title:"OTU ID"}
  };

  Plotly.newPlot("bubble", trace2, layout);

  });
};

function optionChanged(sampleID) {
  demoInfo(sampleID);
  barPlot(sampleID);
  bubblePlot(sampleID);
};

  