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
     <img src="${avatar_url}">
     <h1>${name}</h1>
     <h2>${login}</h2>
     <p>${bio}</p>
     <div class="options">
         <div class="network">
             <img src="">
             <span>${followers}</span>
         </div>
         <div class="repo">
             <img src="">
             <span>${public_repos}</span>
         </div>
     </div>
 </div>
    `
 }
 
 criarCardFoundNot = () => {
     return `
     <div class="content">
     <img src="./assets/img/found-not.svg">
     </div>
`
 }