// 1. Borda do header ao rolar
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// 2. Entrada suave dos blocos ao aparecerem na tela
const revealTargets = document.querySelectorAll('.section-head, .showcase, .card, .offer, .process li, .about, .contact > *');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -6% 0px' });
    revealTargets.forEach((el) => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// 3. Ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// 4. Botões dos serviços já marcam o assunto no formulário
document.querySelectorAll('[data-assunto]').forEach((link) => {
    link.addEventListener('click', () => {
        const radio = document.querySelector(`input[name="assunto"][value="${link.dataset.assunto}"]`);
        if (radio) radio.checked = true;
    });
});

// 5. Formulário de contato (Web3Forms)
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const feedback = document.getElementById('formFeedback');

function setFeedback(text, kind) {
    feedback.textContent = text;
    feedback.className = 'feedback' + (kind ? ' ' + kind : '');
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Validação simples com marcação acessível dos campos inválidos
    let valid = true;
    form.querySelectorAll('input[required], textarea[required]').forEach((field) => {
        const ok = field.checkValidity() && field.value.trim() !== '';
        field.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (!ok) valid = false;
    });
    if (!valid) {
        setFeedback('Preencha nome, um e-mail válido e a mensagem.', 'err');
        return;
    }

    const data = Object.fromEntries(new FormData(form));
    data.subject = `[${data.assunto}] Contato pelo portfólio: ${data.name}`;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';
    setFeedback('');

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message);

        form.reset();
        setFeedback('Mensagem enviada. Obrigada! Retorno em breve.', 'ok');
    } catch (error) {
        setFeedback('Não foi possível enviar agora. Tente novamente ou use o e-mail ao lado.', 'err');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensagem';
    }
});
