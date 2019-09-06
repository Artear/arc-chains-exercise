/* eslint-disable */
javascript: (function() {
  const sections = document.querySelectorAll("[class^='section |']");
  sections.forEach(section => {
    const border = "2px dotted purple";
    if (section.style.border === border) {
      section.style.border = "none";
    } else {
      section.style.border = border;
    }
  });
})();
