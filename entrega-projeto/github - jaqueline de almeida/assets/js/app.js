const form = document.querySelector('form');
const input = document.querySelector('#search');
const profile = document.querySelector('.profile');
const listrepo = document.querySelector('.listrepo');
const content = document.querySelector('.content');

form.addEventListener('submit', (event) => {
    event.preventDefault();
 
    const usuario = input.value.trim();
 
    if(usuario){

        const statusUsuario = getUsuario(usuario)

      return  statusUsuario
    } 
     return alert('informe o usuário')
 })



const getUsuario = async (usuario) => {

    try {
     const requisicaoUsuario = await fetch(`https://api.github.com/users/${usuario}`)
     const requisicaoRepo = await fetch(`https://api.github.com/users/${usuario}/repos`)

     if(requisicaoUsuario.status === 404){
        throw new Error();
     }
     const usuarioInformacoes = await requisicaoUsuario.json();
     const usuarioRepo = await requisicaoRepo.json();

     if(requisicaoRepo.status === 404){
        content.innerHTML = `
        <div class="profile">${criarCardUsuario(usuarioInformacoes)}</div>
        <div class="listrepo">${usuario} não tem repositórios públicos ainda.</div>`
    
    } else {
        content.innerHTML = `
        <div class="profile">${criarCardUsuario(usuarioInformacoes)}</div>
        <div class="listrepo">${criarCardRepo(usuarioRepo)}</div>`
    }

    } catch {
            content.innerHTML = criarCardFoundNot();
    }
}


const criarCardRepo = (requisicaoRepo) => {

 
    let render = '';
    render += '<div class="cards">';

        for (let i = 0; i < requisicaoRepo.length; i = i + 2) {
        render += `
    <div class="colunm_repo">        
        <div class="card__repo">
            <div class="tituloRepo padding-6"><a href="https://github.com/${requisicaoRepo[i].full_name}">${requisicaoRepo[i].name}</a></div>
                <p class="descricaoRepo padding-6">${requisicaoRepo[i].description ? requisicaoRepo[i].description : ' '}</p> 
            
                <div class="descricao padding-6">
                    <div class="bolinha ">
                        <img src="./assets/img/circule.svg"> 
                        ${requisicaoRepo[i].language ? requisicaoRepo[i].language : ' '}</div>
                    <div class="estrelinha">
                        <img src="./assets/img/star.svg">
                        ${requisicaoRepo[i].forks}
                    </div>
                </div>
        </div>
        
        <div class="card__repo">
            <div class="tituloRepo padding-6"><a href="https://github.com/${requisicaoRepo[i+1].full_name}">${requisicaoRepo[i+1].name}</a></div>
                <p class="descricaoRepo padding-6">${requisicaoRepo[i+1].description ? requisicaoRepo[i+1].description : ' '}</p> 
            
                <div class="descricao padding-6">
                    <div class="bolinha ">
                        <img src="./assets/img/circule.svg">
                        ${requisicaoRepo[i+1].language ? requisicaoRepo[i+1].language : ' '}
                    </div>
                
                    <div class="estrelinha">
                        <img src="./assets/img/star.svg">
                        ${requisicaoRepo[i].forks}
                </div>
            </div>
        </div>
    </div>
        `;
        }

    render += '</div>';
    return render;
}


const criarCardUsuario = (usuarioInformacoes) => {
    const { login, name, bio, followers, public_repos, avatar_url} = usuarioInformacoes;
     return `
     <img class="avatar padding-10" src="${avatar_url}">
     <h1 class="padding-6">${name}</h1>
     <h2 class="padding-6">${login}</h2>
     <p class="padding-6">${bio}</p>

     <div class="options text-center">
         <div class="network color-white">
             <img class="ico" src="./assets/img/followers.svg">
             <span>${followers}</span>
         </div>
         <div class="repo color-white">
             <img class="ico" src="./assets/img/public_repos.svg">
             <span>${public_repos}</span>
         </div>
     </div>
    `
 }
 
 criarCardFoundNot = () => {
     return `
     <div class="notfound text-center padding-61">
     <h1>Usuário não encontrado :(</h1>
     <p>Pesquisa novamente</p>
     <img class="img-found" src="./assets/img/found.png">
     </div>
`
 }