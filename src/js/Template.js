class Template {
  /**
   * Load an HTML template into the container.
   * @param  {string} template  ID of the template
   * @param  {string} container ID of the container
   * @return void
   */
  load(template, container) {
    let t = document.getElementById(template + '__template');
    let c = document.getElementById(container + '__container');
    let l = document.importNode(t.content, true);
    c.appendChild(l);
  }

  /**
   * Event listener for clicks.
   * @param  {string}   el       name of template
   * @param  {Function} callback action
   * @return void
   */
  listen(el, callback) {
    let t = document.getElementById(el + '__button');
    t.onclick = function() {
      callback();
    }
  }
}
