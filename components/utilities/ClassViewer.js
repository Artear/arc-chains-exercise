/* eslint-disable */
(function() {
  const parentClass = "body";

  function getChildElementClasses(element) {
    const childClasses = [];
    const getChildElementClassList = node => {
      node = node.firstChild;
      while (node) {
        const classList = node.classList;
        if (classList && classList.length > 0) {
          childClasses.push(node.classList);
        }
        getChildElementClassList(node);
        node = node.nextSibling;
      }
    };
    if (element && element.length > 0) {
      getChildElementClassList(element[0]);
    }
    return childClasses;
  }

  function groupDataByColumnAndMetric(data, column, metric, sortBy) {
    const result = [];
    data.reduce(function(res, value) {
      if (!res[value[column]]) {
        res[value[column]] = { [column]: value[column], [metric]: 0 };
        result.push(res[value[column]]);
      }
      res[value[column]][metric] += value[metric];
      return res;
    }, {});
    const output =
      sortBy === "count"
        ? result.sort((a, b) => (a[metric] < b[metric] ? 1 : -1))
        : result.sort((a, b) => (a[column] > b[column] ? 1 : -1));
    return output;
  }

  function getClassDataMetrics(data) {
    const counts = [],
      lengths = [];
    data.map(datum => {
      counts.push(datum["count"]);
      lengths.push(datum["className"].length);
    });
    const sumLengths = lengths.reduce(
      (previous, current) => (current += previous)
    );
    return {
      unique: data.length,
      total: counts.reduce((a, b) => a + b, 0),
      avgLength: parseInt(sumLengths / lengths.length, 10),
      maxLength: Math.max(...lengths)
    };
  }

  function displayClassData(sortBy, filterBy) {
    const select = document.getElementById("sortBy_select");
    const selectedSortBy = select.options[select.selectedIndex].value;
    const classData = generateClassListData(
      document.querySelectorAll(parentClass),
      sortBy || selectedSortBy,
      filterBy
    );
    titlePanel.innerText = "CSS Class Data";
    metricsPanel.innerText = JSON.stringify(getClassDataMetrics(classData));
    dataPanel.innerText = JSON.stringify(classData, null, 2);
    console.log(JSON.stringify(classData));
  }

  function generateClassListData(element, sortBy, filterBy) {
    const childClasses = getChildElementClasses(element);
    const data = [];
    for (const child in childClasses) {
      [...childClasses[child]].map(className => {
        (!filterBy || className.indexOf(filterBy) >= 0) &&
          data.push({
            className: className,
            count: 1
          });
      });
    }
    return groupDataByColumnAndMetric(data, "className", "count", sortBy);
  }

  // Remove panel(s) if already present.
  const existingPanels = document.getElementsByClassName("data_panel");
  if (existingPanels.length > 0) {
    for (let i = 0; i < existingPanels.length; i++) {
      existingPanels[i].parentElement.removeChild(existingPanels[i]);
    }
  }

  // Create and style data viewer panel.
  let panel = document.createElement("div");
  panel.setAttribute("class", "data_panel");
  panel.setAttribute(
    "style",
    "background-color: #fff; color: #000; position: fixed;" +
      "top: 0; bottom: 0; right: 0; width: 30%; border: 2px solid #036;" +
      "font: 12px/1.2 monospace; padding: 0; z-index: 1000000000;"
  );

  // Add button panel.
  let buttonPanel = document.createElement("div");
  buttonPanel.setAttribute("class", "data_panel_buttons");
  buttonPanel.setAttribute(
    "style",
    "font-family:Arial;display: flex; justify-content: flex-start; padding: 10px; background: #036;color: white;"
  );
  panel.append(buttonPanel);

  // Add title panel.
  let titlePanel = document.createElement("h2");
  titlePanel.setAttribute("class", "data_panel_title");
  titlePanel.setAttribute("style", "font-family: monospace; padding: 10px;");
  panel.append(titlePanel);

  // Add metrics panel.
  let metricsPanel = document.createElement("div");
  metricsPanel.setAttribute("class", "data_panel_metrics");
  metricsPanel.setAttribute(
    "style",
    "font-size:.7rem;padding:10px;font-weight:bold;"
  );
  panel.append(metricsPanel);

  // Add data panel.
  let dataPanel = document.createElement("pre");
  dataPanel.setAttribute("class", "data_panel_content");
  dataPanel.setAttribute(
    "style",
    "padding: 10px; overflow: scroll; height: 89vh; margin: 0"
  );
  panel.append(dataPanel);

  // Create Sort Select
  let select = document.createElement("select");
  let option1 = document.createElement("option");
  let option2 = document.createElement("option");
  option1.value = "count";
  option1.text = "Count";
  option2.value = "className";
  option2.text = "Class Name";
  select.id = "sortBy_select";
  select.add(option1, null);
  select.add(option2, null);
  select.setAttribute("style", "height:22px;");
  select.onchange = e => {
    const filterValue = document.querySelector("#filter_input").value;
    displayClassData(
      e.target.value,
      filterValue === "" ? undefined : filterValue
    );
  };

  // Add Sort label and Sort Select
  let sortLabel = document.createElement("span");
  sortLabel.innerText = "Sort By";
  sortLabel.setAttribute("style", "margin:.4rem .8rem 0;");
  buttonPanel.append(sortLabel);
  buttonPanel.append(select);

  // Create Filter Input
  let filter = document.createElement("input");
  filter.id = "filter_input";
  filter.innerText = "Filter";
  filter.setAttribute("style", "height:22px;");
  filter.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      displayClassData(
        undefined,
        document.querySelector("#filter_input").value
      );
    }
  });

  // Add Filter label and Filter Input
  let filterLabel = document.createElement("span");
  filterLabel.innerText = "Filter";
  filterLabel.setAttribute("style", "margin:.4rem .8rem 0;");
  buttonPanel.append(filterLabel);
  buttonPanel.append(filter);

  // Add Run button
  let runButton = document.createElement("button");
  runButton.innerText = "Run";
  buttonPanel.append(runButton);

  // Add Close button
  let closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  buttonPanel.append(closeButton);

  // Style buttons.
  let buttons = buttonPanel.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute(
      "style",
      "border: solid 1px #999;background: #0d3058;margin-left: 10px;color: #fff;font-family: sans-serif;padding: 0 .8rem;"
    );
  }

  // Add panel to document.
  document.body.append(panel);

  // Add button event listeners.
  runButton.addEventListener("click", displayClassData());
  closeButton.addEventListener("click", function() {
    panel.parentElement.removeChild(panel);
  });
})();
