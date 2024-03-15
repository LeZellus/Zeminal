document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.getElementById('prompt');
    const historyElement = document.getElementById('history');
    let displayedHistory = '';
    let commandHistory = [];
    let currentHistoryIndex = -1;

    inputElement.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();

            const command = inputElement.value;
            displayedHistory += `C:\\Users\\google\\zeminal.fr\\prompt> ${command}\n`;

            // Ajout de la commande à l'historique et réinitialisation de l'index
            commandHistory.push(command);
            currentHistoryIndex = commandHistory.length;

            // Traitement de la commande
            let response = '';
            switch (command) {
                case 'skills':
                    response = "> Je bosse dur";
                    break;
                case 'about':
                    response = "> Je suis fatigué";
                    break;
                default:
                    response = "> Commandes disponibles: help, about, skills;";
            }
            addCommandToHistory(`C:\\Users\\google\\zeminal.fr\\prompt> ${command}`, response);

            // Ajout de la commande à l'historique et réinitialisation de l'index
            commandHistory.push(command);
            currentHistoryIndex = commandHistory.length;

            inputElement.value = '';
            scrollToBottom();
        }
    });

    inputElement.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentHistoryIndex > 0) {
                currentHistoryIndex--;
                inputElement.value = commandHistory[currentHistoryIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentHistoryIndex < commandHistory.length - 1) {
                currentHistoryIndex++;
                inputElement.value = commandHistory[currentHistoryIndex];
            } else {
                currentHistoryIndex = commandHistory.length;
                inputElement.value = '';
            }
        }
    });

    document.getElementById('fullscreen').addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    function scrollToBottom() {
        const terminalContainer = document.getElementById("terminal-container");
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
    }

    function addCommandToHistory(command, response) {
        const commandElement = document.createElement('p');
        commandElement.classList.add('mb-2');
        commandElement.textContent = command;
        historyElement.appendChild(commandElement);

        const responseElement = document.createElement('p');
        responseElement.textContent = response;
        historyElement.appendChild(responseElement);
    }

    function keepInputFocused() {
        if (document.activeElement !== inputElement) {
            inputElement.focus();
        }
    }

    document.addEventListener('click', keepInputFocused);
    document.addEventListener('scroll', keepInputFocused, true);
});
