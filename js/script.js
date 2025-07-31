// Seleciona os elementos do DOM usados no script
const addWorkoutFab = document.getElementById('add-workout-fab');
const modalOverlay = document.getElementById('modal-overlay');
const addWorkoutForm = document.getElementById('add-workout-form');
const cancelBtn = document.getElementById('cancel-btn');
const workoutNameInput = document.getElementById('workout-name-input');
const workoutDescInput = document.getElementById('workout-desc-input');
const workoutContainer = document.getElementById('workout-container');

// Evento para enviar o formulário de novo treino
addWorkoutForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o reload da página

    const workoutName = workoutNameInput.value.trim();
    const workoutDesc = workoutDescInput.value.trim();

    // Valida se o nome do treino foi preenchido
    if (!workoutName) {
        alert("O nome do treino é obrigatório!");
        return;
    }

    console.log("Treino que vai ser adicionado:");
    console.log({ name: workoutName, description: workoutDesc });

    // Cria objeto com os dados do treino para adicionar na lista
    const workoutToAdd = {
        title: workoutNameInput.value,
        description: workoutDescInput.value,
    };

    // Adiciona o treino à lista e atualiza a exibição
    workouts.push(workoutToAdd);
    renderWorkout();
    saveWorkout();

    // Limpa o formulário e fecha o modal
    addWorkoutForm.reset();
    closeModal();
});

// Abre o modal para adicionar treino
function openModal() {
    modalOverlay.style.display = 'flex';
}

// Fecha o modal
function closeModal() {
    modalOverlay.style.display = 'none';
}

// Evento para abrir modal ao clicar no botão de adicionar treino
addWorkoutFab.addEventListener('click', openModal);


// Evento para fechar modal ao clicar no botão cancelar
cancelBtn.addEventListener('click', closeModal);

// Fecha o modal ao clicar fora do conteúdo do modal (fundo escuro)
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});

// Lista padrão de treinos
const defaultWorkout = [
    {
    title: "Braços - Segunda feira",
    description: "Rosca direta (3x12), rosca martelo (3x10-12), rosca concentrada unilateral (3x10), tríceps testa com halteres (3x12), tríceps coice (3x10-12) e mergulho no banco (3x10-15).",
    },
];

// Recupera a lista de treinos do localStorage ou inicia com a lista padrão
const savedWorkouts = localStorage.getItem('workouts-local');
let workouts = savedWorkouts ? JSON.parse(savedWorkouts) : defaultWorkout;

// Salva a lista de treinos atualizada no localStorage
function saveWorkout() {
    localStorage.setItem('workouts-local', JSON.stringify(workouts));
}

// Renderiza a lista de treinos na tela
function renderWorkout(){
    // Mapeia cada treino para um card em HTML
    const workoutCardsHTML = workouts.map(workout => {
        return `<div class="workout-card">
                    <h4 class="card-title title">${workout.title}</h3>
                    <div class="info-repetition-container item-individual-container">
                        <!-- <h5 class="exercises-number-title title">NÚMERO DE EXERCICIOS: </h5>
                         <p class="exercises-number desc">5</p>-->
                    </div>
                    <div class="description-container item-individual-container">
                        <p class="desc">${workout.description}</p>
                        <button class="remove-btn" data-title="${workout.title}">X</button>
                    </div>
                </div>
                `
    });

    // Atualiza o container com os cards gerados
    workoutContainer.innerHTML = workoutCardsHTML.join('');
};


// Evento para detectar o clique no botão de remover treino
workoutContainer.addEventListener('click', (event) => {
    const clickElement = event.target;
    // Verifica se o clique foi no botão com a classe remove-btn
    const removeButton = clickElement.closest('.remove-btn');

    if (removeButton){
        const workoutToRemove = removeButton.dataset.title;

        // Filtra a lista removendo o treino clicado
        workouts = workouts.filter(workout => workout.title !== workoutToRemove);
        
        // Atualiza a tela e o localStorage
        renderWorkout();
        saveWorkout();
    }
})

// Renderiza a lista de treinos quando a página carrega
renderWorkout();
