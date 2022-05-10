$(".progress-chart").each(async function() {
  let chartFileName = $(this).attr("data-chart-meta");
  let chartFile = await fetch(`./${chartFileName}`);
  let data = await chartFile.json();

  let options = {};
  if ("chartOptions" in data) {
    options = data.chartOptions;
  }

  // Override Colors
  let darkMode = isDarkMode();
  defaultOptions = {
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "#fffffe" : "#094067"
        },
        title: {
          color: darkMode ? "#fffffe" : "#094067"
        }
      }
    },
    scales: {
      x: {
        title: {
          color: darkMode ? "#fffffe" : "#094067"
        },
        grid: {
          color: darkMode ? "#b3c2d7" : "#5f6c7b",
          borderColor: darkMode ? "#b3c2d7" : "#5f6c7b",
          tickColor: darkMode ? "#b3c2d7" : "#5f6c7b"
        },
        ticks: {
          color: darkMode ? "#b3c2d7" : "#5f6c7b"
        }
      },
      y: {
        title: {
          color: darkMode ? "#fffffe" : "#094067"
        },
        grid: {
          color: darkMode ? "#b3c2d7" : "#5f6c7b",
          borderColor: darkMode ? "#b3c2d7" : "#5f6c7b",
          tickColor: darkMode ? "#b3c2d7" : "#5f6c7b"
        },
        ticks: {
          color: darkMode ? "#b3c2d7" : "#5f6c7b"
        }
      }
    }
  }

  const mergedOptions = _.merge(options, defaultOptions)

  const config = {
    type: data.type,
    data: data.chartData,
    options: mergedOptions
  };
  new Chart(
    this,
    config
  );
});
