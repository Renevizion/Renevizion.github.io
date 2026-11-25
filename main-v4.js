document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const inquiryForm = document.getElementById('review-form');
  const formNote = document.getElementById('form-note');
  const submitButton = inquiryForm?.querySelector('button[type="submit"]');
  if (!inquiryForm || !formNote || !submitButton) return;

  const params = new URLSearchParams(window.location.search);
  ['source', 'medium', 'campaign'].forEach((key) => {
    const field = document.getElementById(`utm-${key}`);
    if (field) field.value = params.get(`utm_${key}`) || '';
  });

  const restoreSubmitState = () => {
    submitButton.disabled = false;
    submitButton.textContent = 'Start the conversation ↗';
    formNote.className = 'form-note';
    formNote.textContent = 'Your message sends directly to Milocro. We’ll get back to you by email.';
  };

  // Restore the form if a visitor returns from Formbold using the back button.
  window.addEventListener('pageshow', restoreSubmitState);

  inquiryForm.addEventListener('submit', (event) => {
    if (!inquiryForm.checkValidity()) {
      event.preventDefault();
      inquiryForm.reportValidity();
      return;
    }

    // Automatic Turnstile requires a native POST to Formbold's verification
    // page. CAPTCHA and honeypot enforcement are configured at the receiver.
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    formNote.className = 'form-note is-pending';
    formNote.textContent = 'Sending your message…';
  });
});
