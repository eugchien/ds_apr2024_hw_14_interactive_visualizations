// Build the metadata panel
function buildMetadata(sample) {
  d3.json('https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json').then((data) => {

    // Get the metadata field
    let metadata = data.metadata;
    // console.log(metadata)

    // Filter the metadata for the object with the desired sample number
    let filter_metadata = metadata.filter(f => f.id == sample);
    let result = filter_metadata[0];
    // console.log(filter_metadata)

    // Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select('#sample-metadata');
    // console.log(PANEL)

    // Use `.html("") to clear any existing metadata
    PANEL.html('');

    // Use the filtered result to populate the metadata panel
    // Hint: Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (key in result){PANEL.append().text(`${key}: ${result[key]}`)};
  })
}

// function to build both charts
function buildCharts(sample) {
  d3.json('https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json').then((data) => {

    // Get the samples field
    let samples = data.samples;
    // console.log(samples)

    // Filter the samples for the object with the desired sample number
    let filter_metadata = samples.filter(f => f.id == sample);
    let result = filter_metadata[0];
    // console.log(result)

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let sample_values = result.sample_values;
    // console.log(sample_values)
    // console.log(otu_ids)
    // console.log(metadata)

    // Build a Bubble Chart
    let bubble_layout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {title:'OTU ID'},
      yaxis: {title:'Number of Bacteria'},
    };

    let bubble_chart = [
      { x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: 'rbg',
          opacity: '0.5',
          showlegend: false
        }
      }
    ];

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubble_chart, bubble_layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.map(n => `OTU ${n} `);

    // Build a Bar Chart
    // Make sure to slice and reverse the input data appropriately
    let bar_layout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: {title: 'Number of Bacteria'},
      yaxis: {title: 'OTU IDs'}
    };

    let bar_chart = [
      { x: sample_values.slice(0, 10).reverse(),
        y: yticks.slice(0, 10).reverse(),
        type: 'bar',
        marker: {color: '#8c564b'}
      }
    ];

    // Render the Bar Chart
    Plotly.newPlot('bar', bar_chart, bar_layout);
  })
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < names.length; i++){dropdown.append('option').text(names[i])};

    // Get the first sample from the list
    let first_sample = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(first_sample);
    buildMetadata(first_sample);
  })
}

// Function for event listener
function optionChanged(new_sample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(new_sample);
  buildMetadata(new_sample);
}

// Initialize the dashboard
init();
