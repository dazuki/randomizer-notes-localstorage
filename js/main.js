function initMain() {
  document.querySelectorAll('textarea').forEach(function (element) {
    var offset = element.offsetHeight - element.clientHeight;

    // local storage: load on page load/refresh
    if (store.size() > 0) {
      if (store.has(element.name)) {
        element.value = store(element.name);
        element.closest('details').open = true;
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

  document.querySelectorAll('input[type=checkbox]').forEach(function (element) {
    element.addEventListener('change', function (event) {
      //console.log(event.target.name + ': ' + event.target.checked);
      if (event.target.checked) {
        store(event.target.name, event.target.value);
        console.log(event.target.name + ': ' + store(event.target.name));
      } else {
        store.remove(event.target.name);
        console.log(event.target.name + ': unchecked');
      }
    });

    if (store.has(element.name)) {
      element.checked = true;
      console.log('restored(' + element.name + '): ' + store(element.name));
    }
  });

  document.getElementById('resetBtn').addEventListener('click', function () {
    document.querySelectorAll('textarea').forEach(function (element) {
      store.remove(element.name);
      if (element.name != 'other-notes') {
        element.closest('details').open = false;
      }
      element.value = '';
    });

    document.querySelectorAll('input[type=checkbox]').forEach(function (element) {
      store.remove(element.name);
      element.checked = false;
    });

    console.log('cleared localstorage');
  });
}
