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
    return this;
  }

  /** 
   * Empty a container 
   * @param  {string} container name of the container 
   * @return {Template} 
   */ 
  empty(container) { 
    let c = document.getElementById(container + '__container'); 
    c.innerHTML = ''; 
    return this; 
  }

  observe(el, object, callback) {
    
  }

  listen(el, object, callback) {
    let t = document.getElementById(el + '__button');
    return t.onclick = function() {
      object[callback]();
    }
  }
}
