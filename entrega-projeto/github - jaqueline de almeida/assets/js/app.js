const form = document.querySelector('form');
const input = document.querySelector('#search');
const profile = document.querySelector('.profile');

form.addEventListener('submit', (event) => {
    event.preventDefault();
 
    const usuario = input.value.trim();
 
    if(usuario){
      return getUsuario(usuario)
    } 
     return alert('informe o usuário')
 })

const getUsuario = async (usuario) => {

    try {
     const requisicao = await fetch(`https://api.github.com/users/${usuario}`)
     if(requisicao.status === 404){
         throw new Error();
     }
     const usuarioInformacoes = await requisicao.json();
     profile.innerHTML = criarCardUsuario(usuarioInformacoes)
    } catch {
     profile.innerHTML = criarCardFoundNot()

    }
}

const criarCardUsuario = (usuario) => {
    const { login, name, bio, followers, public_repos, avatar_url} = usuario;
     return `
     <div class="content">
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