/* eslint-disable */
(function(){

  function groupDataByColumnAndMetric(data, column, metric, sortBy) {
    const result = [];
    data.reduce(function(res, value) {
      if (!res[value[column]]) {
        res[value[column]] = { [column]: value[column], [metric]: 0 }
        result.push(res[value[column]])
      }
      res[value[column]][metric] += 1
      return res;
    }, {})
    const output = sortBy === 'count'
      ? result.sort((a, b) => (a[metric] < b[metric]) ? 1 : -1)
      : result.sort((a, b) => (a[column] > b[column]) ? 1 : -1)
    return output
  }

  function getTotalWordCount(elements) {
    return elements.reduce((total, element) => {
      if (element.type === 'text') {
        const count = element.content.split(' ').length;
        return total + count;
      }
      return total;
    }, 0);
  }

  function getContentCacheBreakdowns(cache) {
    const results = []
    const siteServiceCache = cache["site-service"]
    const siteServiceKeys = Object.keys(siteServiceCache || {})

    siteServiceKeys.map(key => {
      const keyName = key.toString().split(',')[0].split(':')[1].replace('}', '').replace(/\"/g, '')
      results.push({
        [keyName]: (JSON.stringify(siteServiceCache[key]).toString().length/1024).toFixed(2) + 'KB'
      })
    })

    const contentKeys = Object.keys(cache || {})
    contentKeys.map(contentKey => {
      if (contentKey !== 'site-service') {
        results.push({
          [contentKey]: (JSON.stringify(cache[contentKey]).toString().length/1024).toFixed(2) + 'KB'
        })
      }
    })

    return JSON.stringify(results)
  }

  // Remove panel(s) if already present.
  const existingPanels = document.getElementsByClassName('fusion_data_panel')
  if (existingPanels.length > 0) {
    for (let i=0; i < existingPanels.length; i++) {
      existingPanels[i].parentElement.removeChild(existingPanels[i])
    }
  }

  // Create and style data viewer panel.
  let panel = document.createElement('div')
  panel.setAttribute(
    'class', 
    'fusion_data_panel'
  )
  panel.setAttribute(
    'style', 
    'background-color: #369; color: #FFF; position: fixed;' + 
    'top: 0; bottom: 0; right: 0; width: 50%; border: 2px solid #036;' + 
    'font: 12px/1.2 monospace; padding: 0; z-index: 1000000000;'
  )

  // Add button panel.
  let buttonPanel = document.createElement('div')
  buttonPanel.setAttribute(
    'class', 
    'fusion_data_panel_buttons'
  )
  buttonPanel.setAttribute(
    'style',
    'display: flex; justify-content: flex-start; padding: 10px; background: #036;'
  )
  panel.append(buttonPanel)

  // Add title panel.
  let titlePanel = document.createElement('h2')
  titlePanel.setAttribute(
    'class', 
    'fusion_data_panel_title'
  )
  titlePanel.setAttribute(
    'style', 
    'font-family: monospace; padding: 10px;'
  )
  panel.append(titlePanel)

  // Add data network requests panel.
  let dataRequestsPanel = document.createElement('div')
  dataRequestsPanel.setAttribute(
    'class', 
    'data_panel_metrics'
  )
  dataRequestsPanel.setAttribute(
    'style', 
    'font-size: .8rem;padding: 10px;font-family: arial;line-height: 1.3rem;margin-bottom:4px;'
  )
  panel.append(dataRequestsPanel)

  // Add metrics panel.
  let metricsPanel = document.createElement('div')
  metricsPanel.setAttribute(
    'class', 
    'data_panel_metrics'
  )
  metricsPanel.setAttribute(
    'style', 
    'font-size: .8rem;padding: 10px;font-family: arial;line-height: 1.3rem;'
  )
  panel.append(metricsPanel)

  // Add data panel.
  let dataPanel = document.createElement('pre')
  dataPanel.setAttribute(
    'class', 
    'fusion_data_panel_content'
  )
  dataPanel.setAttribute(
    'style', 
    'padding: 10px; overflow: scroll;height: 85vh; margin: 0'
  )
  panel.append(dataPanel)

  // Add buttons.
  let globalContentButton = document.createElement('button')
  globalContentButton.innerText = 'Global Content'
  buttonPanel.append(globalContentButton)

  let contentCacheButton = document.createElement('button')
  contentCacheButton.innerText = 'Content Cache'
  buttonPanel.append(contentCacheButton)

  let contextPathButton = document.createElement('button')
  contextPathButton.innerText = 'Context Path'
  buttonPanel.append(contextPathButton)

  let globalContentConfigButton = document.createElement('button')
  globalContentConfigButton.innerText = 'Global Content Config'
  buttonPanel.append(globalContentConfigButton)

  let arcSiteButton = document.createElement('button')
  arcSiteButton.innerText = 'arcSite'
  buttonPanel.append(arcSiteButton)

  let closeButton = document.createElement('button')
  closeButton.innerText = 'Close'
  buttonPanel.append(closeButton)

  // Style buttons.
  let buttons = buttonPanel.getElementsByTagName('button');
  for (let i=0; i < buttons.length; i++) {
    buttons[i].setAttribute(
      'style',
      'border: solid 1px #999; background: #CCC; padding: 3px; margin-right: 10px; color: #333; font-family: sans-serif'
    )
  }

  // Add panel to document.
  document.body.append(panel)

  // Add button event listeners.
  globalContentButton.addEventListener('click', function(){
    const globalContent = window.Fusion.globalContent
    const contentElements = globalContent.content_elements || []
    let content = JSON.stringify(globalContent)
    titlePanel.innerText = 'Global Content : ' + getContentSize(content) + 'KB'
    const totalParagraphs = contentElements.filter(element => element.type === 'text').length
    const totalWordCount = getTotalWordCount(contentElements)
    const metrics = 'Total Word Count: ' + totalWordCount + '\r\n' + 'Avg Words per Paragraph: ' + parseInt(totalWordCount/totalParagraphs, 10) + '\r\n'
    const breakdown = JSON.stringify(groupDataByColumnAndMetric(contentElements, 'type', 'count', 'count')).replace('[', '').replace(/"/g, '').replace(']', '')
    metricsPanel.innerText = metrics + breakdown
    dataPanel.innerText = JSON.stringify(window.Fusion.globalContent, null, 2)
  })

  contentCacheButton.addEventListener('click', function(){
    let content = JSON.stringify(window.Fusion.contentCache);
    titlePanel.innerText = 'Content Cache: ' + getContentSize(content) + 'KB';
    const breakdowns = getContentCacheBreakdowns(window.Fusion.contentCache);

    let dataNetworkCalls = 0;
    const dataFlag = '"data":';
    let position = content.indexOf(dataFlag);

    while (position !== -1) {
      dataNetworkCalls++;
      position = content.indexOf(dataFlag, position + 1);
    }
    dataRequestsPanel.innerText = dataNetworkCalls + " Data network requests"
    metricsPanel.innerText = breakdowns;
    dataPanel.innerText = JSON.stringify(window.Fusion.contentCache, null, 2)
  })

  contextPathButton.addEventListener('click', function(){
    titlePanel.innerText = 'Context Path'
    dataPanel.innerText = window.Fusion.contextPath
  })

  arcSiteButton.addEventListener('click', function(){
    titlePanel.innerText = 'Arc Site'
    dataPanel.innerText = window.Fusion.arcSite
  })

  globalContentConfigButton.addEventListener('click', function(){
    let content = JSON.stringify(window.Fusion.globalContentConfig)
    titlePanel.innerText = 'Global Content Config : ' + getContentSize(content) + 'KB' 
    dataPanel.innerText = JSON.stringify(window.Fusion.globalContentConfig, null, 2)
  })

  closeButton.addEventListener('click', function(){
    panel.parentElement.removeChild(panel)
  })

  function getContentSize(content){
    return (content.length / 1024).toFixed(2)
  }

})()
