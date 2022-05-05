$(".progress-chart").each(async function() {
  let chartFileName = $(this).attr("data-chart-meta");
  let chartFile = await fetch(`./${chartFileName}`);
  let data = await chartFile.json();

  let options = {};
  if ("chartOptions" in data) {
    options = data.chartOptions;
  }

  const config = {
    type: data.type,
    data: data.chartData,
    options: options
  };
  new Chart(
    this,
    config
  );
});
