const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const invitationText = document.getElementById('invitation-text');

const TextOnNoButton = [
    "Sûr ?",
    "Vraiment sûr de toi ?",
    "Haha marrant mais là sérieusement ?",
    "Ohé, le bon bouton c'est moi !",
    "Nan mais repenses-y quand même",
    "Bizarre, on dirait que tu fais exprès",
    "C'est sur moi qu'il faut cliquer haha !",
    "Ok. La prochaine réponse est la dernière.",
    "Si tu ne veux pas de moi : clique ici.",
    "ATTENDS MAIS T'AS VRAIMENT CLIQUÉ LÀ ?!",
    "Mais t'es MALADE ! Aime-moi en fait",
    "T'es censé être amoureuse tu sais !",
    "Amoureuse de moi si t'avais pas compris hein.",
    "...",
    "Mais moi je t'aime...",
    "Mon amour",
    "Ma chérie",
    "Mon rayon de soleil ❤️",
    "C'est l'autre boutonnnnnnnnnnnnnnnnnnnnnnnn",
    "Dis ouiiiiiiiiiiiiiiiiiiiii",
    "Viiiiiiiiiiiiiiiiiite !",
];


let countClickNo = 1;

function changeNonButtonText() {
    noButton.textContent = TextOnNoButton[countClickNo - 1];
}

function changeYesButtonSize() {
    countClickNo++;
    yesButton.style.width = countClickNo * 80 + 200 + 'px';
    yesButton.style.height = countClickNo * 80 + 'px';
    yesButton.style.fontSize = countClickNo * 10 + 'px';
}

noButton.addEventListener('click', () => {
    changeNonButtonText();
    changeYesButtonSize();
});

yesButton.addEventListener('click', () => {
    window.location.href = 'ouaiiiiis.html';
});
