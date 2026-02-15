/*
 * Skript zur Steuerung der Navigation, des Zahlungsmodals und des Kontaktformulars.
 * Die Logik ist absichtlich minimal gehalten, um Fokus auf eine intuitive
 * Benutzerführung zu legen. Das Modal bietet eine Auswahl der angebotenen
 * Zahlungsarten und gibt eine kurze Beschreibung aus, ohne eine echte
 * Zahlungsabwicklung anzustoßen.
 */

// Navigation für Mobilgeräte: Menü ein- oder ausblenden
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Modal‑Elemente
const modal = document.getElementById('payment-modal');
const closeBtn = modal.querySelector('.close');
const buyButtons = document.querySelectorAll('.pricing-card .btn');

// Öffnet das Zahlungsmodal mit dem ausgewählten Paketnamen
function openModal(e) {
  modal.style.display = 'block';
  const plan = e.currentTarget.getAttribute('data-plan');
  const instructions = document.getElementById('payment-instructions');
  instructions.innerHTML = `<em>Sie haben das <strong>${plan}</strong> Paket gewählt.</em>`;
}

// Schließt das Modal
function closeModal() {
  modal.style.display = 'none';
}

// Event Listener für Kaufbuttons
buyButtons.forEach((btn) => {
  btn.addEventListener('click', openModal);
});

// Event Listener für Schließen des Modals
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Zahlungsbuttons im Modal
const paymentBtns = document.querySelectorAll('.payment-btn');
paymentBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const method = e.currentTarget.getAttribute('data-method');
    const instructions = document.getElementById('payment-instructions');
    let text = '';
    switch (method) {
      case 'credit':
        text =
          'Für die Bezahlung per Kreditkarte können Sie später Ihre Kartendaten eingeben. Diese Demo ruft keinen Zahlungsanbieter auf.';
        break;
      case 'paypal':
        text =
          'Bei PayPal werden Sie zu einem sicheren PayPal‑Checkout weitergeleitet.';
        break;
      case 'applepay':
        text =
          'Apple Pay funktioniert mit Geräten aus dem Apple‑Ökosystem. Ein Popup ermöglicht Ihnen die Zahlung mit Face ID oder Touch ID.';
        break;
      case 'googlepay':
        text =
          'Google Pay bietet schnelles Bezahlen für Android‑Nutzer.';
        break;
      case 'sepa':
        text =
          'Bei SEPA erteilen Sie ein Lastschriftmandat für die monatliche Zahlung.';
        break;
      default:
        text = '';
    }
    instructions.textContent = text;
  });
});

// Kontaktformular (nur Demo – keine Daten werden gesendet)
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  alert(
    'Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.'
  );
  contactForm.reset();
});