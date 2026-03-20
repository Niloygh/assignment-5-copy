document.getElementById('signInBtn')
.addEventListener('click', ()=>{
    const username = document.getElementById('username')
    const usernameValue = username.value
    console.log(usernameValue)
    
    const password = document.getElementById('password')
    const passwordValue = password.value
    console.log(passwordValue)

    if(usernameValue === 'admin' && passwordValue === 'admin123'){
        alert('Log in successful')
        username.value = "";
        password.Value = "";
        window.location.assign('home.html')
    }
    else{
        alert('Log In Fail')
        username.value = "";
        password.Value = "";
    }
    
})