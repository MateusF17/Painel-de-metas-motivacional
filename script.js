// script.js

// Espera o conteúdo do DOM ser totalmente carregado para iniciar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- SELETORES DO DOM ---
    const clockElement = document.getElementById('clock');
    const weekdayElement = document.getElementById('weekday');
    const fullDateElement = document.getElementById('full-date');
    const quoteElement = document.getElementById('quote-of-the-day');
    
    // Seletores para a funcionalidade de metas
    const goalInputElement = document.getElementById('goal-input');
    const goalDateElement = document.getElementById('goal-date');
    const saveGoalBtn = document.getElementById('save-goal-btn');
    const goalTextElement = document.getElementById('goal-text');
    const countdownElement = document.getElementById('countdown');

    // Seletores para o controle da música
    const musicAudioElement = document.getElementById('background-music');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    
    // Novos seletores para o menu lateral e papel de parede
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const sideMenu = document.getElementById('side-menu');
    const changeWallpaperBtn = document.getElementById('change-wallpaper-btn');
    const wallpaperInput = document.getElementById('wallpaper-input');
    
    // Variável para guardar o intervalo da contagem regressiva
    let countdownInterval;

    // --- FRASES MOTIVACIONAIS ---
    const motivationalQuotes = [ "Acredite em você mesmo e tudo será possível.", "O sucesso é a soma de pequenos esforços repetidos dia após dia.", "A persistência realiza o impossível.", "O único lugar onde o sucesso vem antes do trabalho é no dicionário.", "Não espere por oportunidades, crie-as.", "Sua única limitação é você mesmo.", "Comece onde você está. Use o que você tem. Faça o que você pode.", "A jornada de mil milhas começa com um único passo.", "Acredite que você pode, assim você já está no meio do caminho.", "O futuro pertence àqueles que acreditam na beleza de seus sonhos.", "Faça de cada dia sua obra-prima.", "Se você quer o arco-íris, precisa aguentar a chuva.", "A melhor maneira de prever o futuro é criá-lo.", "O otimismo é a fé em ação. Nada se pode levar a efeito sem otimismo.", "Para ter sucesso, o seu desejo de sucesso deve ser maior do que o seu medo do fracasso.", "Transforme suas feridas em sabedoria.", "A vida é 10% o que acontece com você e 90% como você reage a isso.", "O que não te desafia, não te transforma.", "A criatividade é a inteligência se divertindo.", "A disciplina é a ponte entre metas e realizações.", "Você nunca é velho demais para definir outra meta ou sonhar um novo sonho.", "A maior glória em viver não está em nunca cair, mas em nos levantar cada vez que caímos.", "A coragem não é a ausência do medo, mas o triunfo sobre ele.", "É durante nossas horas mais sombrias que devemos nos concentrar para ver a luz.", "Caia sete vezes, levante-se oito.", "Seja a mudança que você deseja ver no mundo.", "A dificuldade é uma desculpa que a história nunca aceita.", "Definir um objetivo é o ponto de partida de toda a realização.", "O talento vence jogos, mas o trabalho em equipe e a inteligência vencem campeonatos.", "A felicidade não é algo pronto. Ela vem de suas próprias ações.", "A excelência não é um ato, mas um hábito." ];

    // --- FUNÇÕES ---

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function setDateAndQuote() {
        const now = new Date();
        const dayOfMonth = now.getDate();
        const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        weekdayElement.textContent = weekdays[now.getDay()];
        fullDateElement.textContent = `${dayOfMonth} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
        quoteElement.textContent = motivationalQuotes[dayOfMonth - 1];
    }

    function saveGoal() {
        const goalText = goalInputElement.value;
        const goalDate = goalDateElement.value;
        if (goalText && goalDate) {
            localStorage.setItem('userGoalText', goalText);
            localStorage.setItem('userGoalDate', goalDate);
            displayGoal();
        } else {
            alert('Por favor, preencha a meta e a data limite.');
        }
    }

    function displayGoal() {
        const savedGoalText = localStorage.getItem('userGoalText');
        const savedGoalDate = localStorage.getItem('userGoalDate');
        if (savedGoalText && savedGoalDate) {
            goalTextElement.textContent = savedGoalText;
            startCountdown(savedGoalDate);
        }
    }
    
    function startCountdown(targetDateString) {
        if (countdownInterval) clearInterval(countdownInterval);
        const targetDate = new Date(`${targetDateString}T23:59:59`);
        function updateCountdown() {
            const now = new Date();
            const difference = targetDate - now;
            if (difference <= 0) {
                countdownElement.textContent = "Prazo encerrado!";
                clearInterval(countdownInterval);
                return;
            }
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            countdownElement.textContent = `Tempo Restante: ${days}d ${hours}h ${minutes}m`;
        }
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    function toggleMusic() {
        if (musicAudioElement.paused) {
            musicAudioElement.play();
            musicToggleBtn.innerHTML = 'Pausar Música 🔇';
        } else {
            musicAudioElement.pause();
            musicToggleBtn.innerHTML = 'Tocar Música 🎵';
        }
    }

    // --- NOVAS FUNÇÕES (MENU E PAPEL DE PAREDE) ---

    /**
     * Aplica um papel de parede salvo no localStorage.
     */
    function loadWallpaper() {
        const savedWallpaper = localStorage.getItem('wallpaper');
        if (savedWallpaper) {
            document.body.style.backgroundImage = `url(${savedWallpaper})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
        }
    }

    /**
     * Trata a seleção de um novo arquivo de papel de parede.
     * @param {Event} event - O evento de mudança do input de arquivo.
     */
    function handleWallpaperChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageDataUrl = e.target.result;
                localStorage.setItem('wallpaper', imageDataUrl);
                loadWallpaper(); // Aplica a nova imagem
            };
            reader.readAsDataURL(file);
        }
    }

    // --- INICIALIZAÇÃO E EVENTOS ---

    // Eventos do menu
    menuToggleBtn.addEventListener('click', () => sideMenu.classList.toggle('open'));
    changeWallpaperBtn.addEventListener('click', () => wallpaperInput.click());
    wallpaperInput.addEventListener('change', handleWallpaperChange);

    // Eventos da aplicação principal
    saveGoalBtn.addEventListener('click', saveGoal);
    musicToggleBtn.addEventListener('click', toggleMusic);
    
    // Carrega as configurações salvas e inicia as funções
    loadWallpaper();
    setDateAndQuote();
    updateClock();
    setInterval(updateClock, 1000);
    displayGoal();
});
