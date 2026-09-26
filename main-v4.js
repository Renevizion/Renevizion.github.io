document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const inquiryForm = document.getElementById('review-form');
  const formNote = document.getElementById('form-note');
  const formSuccess = document.getElementById('form-success');
  const formFields = document.getElementById('form-fields');
  const resetFormButton = document.getElementById('reset-form');
  const submitButton = inquiryForm?.querySelector('button[type="submit"]');
  if (!inquiryForm || !formNote || !formSuccess || !formFields || !resetFormButton || !submitButton) return;

  resetFormButton.addEventListener('click', () => {
    inquiryForm.reset();
    inquiryForm.classList.remove('is-complete');
    formSuccess.hidden = true;
    formNote.className = 'form-note';
    formNote.textContent = 'Your message will be sent securely to Milocro. We’ll get back to you by email.';
    submitButton.disabled = false;
    submitButton.textContent = 'Start the conversation ↗';
    document.getElementById('inquiry-name')?.focus();
  });

  inquiryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!inquiryForm.checkValidity()) {
      inquiryForm.reportValidity();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    formNote.className = 'form-note is-pending';
    formNote.textContent = 'Sending your message…';

    try {
      const response = await fetch(inquiryForm.action, {
        method: 'POST',
        body: new FormData(inquiryForm),
        headers: { Accept: 'application/json' },
      });
      const result = await response.json();
      if (!response.ok || result.success !== 'true') throw new Error(result.message || 'Submission failed');

      inquiryForm.reset();
      inquiryForm.classList.add('is-complete');
      formSuccess.hidden = false;
      formSuccess.querySelector('h3')?.focus();
    } catch (error) {
      formNote.className = 'form-note is-error';
      formNote.textContent = 'We couldn’t send your message right now. Please try again or email us directly.';
      submitButton.disabled = false;
      submitButton.textContent = 'Try again ↗';
    }
  });
});
