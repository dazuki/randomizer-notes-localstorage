function initMain() {
  document.querySelectorAll('textarea').forEach(function (element) {
    var offset = element.offsetHeight - element.clientHeight;

    // local storage: load on page load/refresh
    if (store.size() > 0) {
      if (store.has(element.name)) {
        element.value = store(element.name);
        console.log('restored(' + element.name + '): ' + store(element.name));
      }
    }

    element.style.height = 'auto';
    element.style.height = element.scrollHeight + offset + 'px';

    element.addEventListener('input', function (event) {
      if (!element.value) {
        store.remove(element.name);
        console.log(store(element.name));
      } else {
        store(element.name, element.value);
        console.log(store.get(element.name));
      }

      event.target.style.height = 'auto';
      event.target.style.height = event.target.scrollHeight + offset + 'px';
    });
  });

  document.getElementById('resetBtn').addEventListener('click', function () {
    document.querySelectorAll('textarea').forEach(function (element) {
      store.remove(element.name);
      element.value = '';
    });
  });
}

console.log(store());
