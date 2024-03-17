document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.getElementById('prompt');
    const historyElement = document.getElementById('history');
    const terminalContainer = document.getElementById("terminal-container");
    const fullscreenBtn = document.getElementById('fullscreen');
    const iconExitFullscreen = document.getElementById('icon-exit-fullscreen');
    const iconFullscreen = document.getElementById('icon-fullscreen');
    const socialLinks = {
        'Github': 'https://github.com/LeZellus',
        'Linkedin': 'https://www.linkedin.com/in/zellrdesign/',
        'Fiverr': 'https://www.fiverr.com/lezeller',
        'website': 'https://matheozeller.fr/',
        'email': 'mailto:matheo.zeller@gmail.com'
    };

    let commandHistory = [];
    let currentHistoryIndex = -1;

    inputElement.addEventListener('keypress', handleKeyPress);
    inputElement.addEventListener('keydown', handleArrowKeys);
    fullscreenBtn.addEventListener('click', toggleFullScreen);
    document.addEventListener('click', keepInputFocused);
    document.addEventListener('scroll', keepInputFocused, true);

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = inputElement.value.trim();
            processCommand(command);
            inputElement.value = '';
            scrollToBottom();
        }
    }

    function processCommand(command) {
        commandHistory.push(command);
        currentHistoryIndex = commandHistory.length - 1;

        let response = '';

        if (command.startsWith('cd ')) {
            const socialName = command.substring(3); // Récupère le nom du réseau social après 'cd '
            if (socialLinks[socialName]) {
                openSocialLink(socialName);
                addCommandToHistory(command, `> Ouverture de ${socialLinks[socialName]}`);
                return;
            }
        }

        if (command.startsWith('echo ')) {
            const text = command.substring(5); // Récupère le nom du réseau social après 'cd '
            addCommandToHistory(command, `> ${text}`);
            return;
        }

        switch (command) {
            case 'clear':
                clearHistory();
                break;
            case 'skills':
                response = formatSkillsResponse();
                break;
            case 'stacks':
                response = "> Le site est fait en HTML/CSS avec Tailwind et du Javascipt Vanilla";
                break;
            case 'email':
                response = openEmail();
                break;
            case 'about':
                response = "> Je suis Mathéo Zeller, Web développeur passionné de design. Je code depuis bientôt 5ans maintenant...";
                break;
            case 'website':
                response = formatWebsiteResponse();
                break;
            case 'help':
                response = formatHelpResponse();
                break;
            case 'socials':
                response = formatSocialsResponse();
                break;
            case '':
                response = '';
                break;
            default:
                if (command.trim() !== '') {
                    response = formatErrorResponse();
                }
                break;
        }
        addCommandToHistory(command, response);
    }

    function handleArrowKeys(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            if (e.key === 'ArrowUp' && currentHistoryIndex > 0) {
                currentHistoryIndex--;
            } else if (e.key === 'ArrowDown' && currentHistoryIndex < commandHistory.length - 1) {
                currentHistoryIndex++;
            }
            inputElement.value = commandHistory[currentHistoryIndex] || '';
        }
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                iconExitFullscreen.classList.remove('hidden');
                iconFullscreen.classList.add('hidden');
            });
        } else {
            document.exitFullscreen().then(() => {
                iconExitFullscreen.classList.add('hidden');
                iconFullscreen.classList.remove('hidden');
            });
        }
    }

    function clearHistory() {
        historyElement.innerHTML = '';
    }

    function openEmail() {
        return "> matheo.zeller@gmail.com ~ Tapez `<span class=\"text-green-300\">cd email</span>` pour l'ouvrir dans votre boite mail";
    }

    function openWebsite() {
        window.open('https://matheozeller.fr/', '_blank');
    }

    function formatSocialsResponse() {
        return "<ul class='mb-2'>" +
                "  <li><span class='command-color'>Github</span>: https://github.com/LeZellus</li>" +
                "  <li><span class='command-color'>Linkedin</span>: https://www.linkedin.com/in/zellrdesign/</li>" +
                "  <li><span class='command-color'>Fiverr</span>: https://www.fiverr.com/lezeller</li>" +
                "</ul>" +
                "<p>Usage: cd `social_name`</p>" +
                "<p>Exemple: cd Github</p>";
    }

    function formatDefaultResponse() {
        return "";
    }

    function formatErrorResponse() {
        return "<p>Commande erronée. Veuillez essayer à nouveau.</p>" +
            "<p>Tapez `<span class=\"text-green-300\">help</span>` pour obtenir la liste des commandes</p>";
    }

    function formatWebsiteResponse() {
        return "> https://matheozeller.fr/ ~ Tapez `<span class=\"text-green-300\">cd website</span>` pour l'ouvrir dans un navigateur";
    }

    function formatSkillsResponse() {
        return "<ul>" +
            "  <li><span class='command-color'>backend</span>: Symfony, API</li>" +
            "  <li><span class='command-color'>data</span>: MySQL, PHPMyAdmin, Doctrine</li>" +
            "  <li><span class='command-color'>frontend</span>: HTML5, CSS, Tailwind, React</li>" +
            "  <li><span class='command-color'>other</span>: PhpStorm, Gitmoji, FeatherIcons</li>" +
            "</ul>";
    }

    function formatHelpResponse() {
        return "<ul>" +
                "  <li><span class='command-color'>stacks</span>: Affiche technologies utilisées pour ce site.</li>" +
                "  <li><span class='command-color'>about</span>: Affiche quelques lignes à propos de moi.</li>" +
                "  <li><span class='command-color'>email</span>: Affiche mon mail.</li>" +
                "  <li><span class='command-color'>website</span>: Affiche mon site web personnel.</li>" +
                "  <li><span class='command-color'>echo `text`</span>: Affiche le texte tapé</li>" +
                "  <li><span class='command-color'>skills</span>: Affiche une liste détaillée de mes compétences et capacités.</li>" +
                "  <li><span class='command-color'>clear</span>: Recommencer une nouvelle session de discussion.</li>" +
                "</ul>";
    }

    function addCommandToHistory(command, response) {
        const commandElement = document.createElement('div');
        commandElement.innerHTML = `<div class="text-white"><span class="text-pink-400">zeminal.fr</span>@<span class="command-color">prompt</span>:~$ ${command}</div>`;
        historyElement.appendChild(commandElement);

        if (response) {
            const responseElement = document.createElement('div');
            responseElement.classList.add('mb-2', 'response');
            responseElement.innerHTML = response;
            historyElement.appendChild(responseElement);
        }
    }

    function scrollToBottom() {
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
    }

    function keepInputFocused() {
        if (document.activeElement !== inputElement) {
            inputElement.focus();
        }
    }

    function openSocialLink(socialName) {
        const url = socialLinks[socialName];
        if (url) {
            window.open(url, '_blank');
        }
    }
});
