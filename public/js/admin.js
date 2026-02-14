document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('admin-form');
  const messageEl = document.getElementById('message');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (messageEl) messageEl.textContent = '';

    const formData = new FormData(form);
    const passwordInput = document.getElementById('password');
    const password = passwordInput ? passwordInput.value : '';

    try {
      const res = await fetch('/api/papers', {
        method: 'POST',
        headers: {
          'Authorization': password
        },
        body: formData
      });

      if (res.status === 201) {
        if (messageEl) messageEl.textContent = 'Upload successful';
        form.reset();
        return;
      }

      let errMsg = '';
      try {
        const data = await res.json();
        errMsg = data.message || JSON.stringify(data);
      } catch (_) {
        errMsg = await res.text();
      }

      if (messageEl) messageEl.textContent = 'Error: ' + (errMsg || `Status ${res.status}`);
    } catch (err) {
      if (messageEl) messageEl.textContent = 'Network error: ' + (err && err.message ? err.message : err);
    }
  });
});
