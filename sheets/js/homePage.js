$(() => {
  const port = 'http://localhost:3000';
  let width = this.innerWidth;
  let height = this.innerHeight - 32;
  chai.use(chaiHttp);

  const container = document.getElementById('container');
  const contentPart = document.getElementById('contentPart');
  const buttonsHome = document.getElementById('buttons-home');
  const buttons = document.getElementById('buttons');
  const inputs = document.querySelectorAll('input');
  const signUp = document.getElementById('sign-up');
  const signIn = document.getElementById('sign-in');
  const inputsHome1 = document.getElementById('inputs-home1');
  const inputsHome2 = document.getElementById('inputs-home2');

  let counter = 'signUpPage';
  $('#sign-up').on('click', () => {
    if(counter !== 'signUpPage'){
      signIn.style.color = 'rgb(96, 203, 238)';
      signIn.style.backgroundColor = 'white';
      signUp.style.color = 'white';
      signUp.style.backgroundColor = 'rgb(96, 203, 238)';
      $('.sign-in-input-home').hide();
      $('.sign-up-input-home').show();
      counter = 'signUpPage';
    }
  });
  $('#sign-in').on('click', () => {
    if(counter !== 'signInPage'){
      signUp.style.color = 'rgb(96, 203, 238)';
      signUp.style.backgroundColor = 'white';
      signIn.style.color = 'white';
      signIn.style.backgroundColor = 'rgb(96, 203, 238)';
      $('.sign-up-input-home').hide();
      $('.sign-in-input-home').show();
      counter = 'signInPage';
    }
  });
  
  let displayCounter = 'flex';
  setInterval(() => {
    width = this.innerWidth;
    height = this.innerHeight - 32;
    if(width < 811 && displayCounter == 'flex'){
      const buttonWidth = (width/100)*40 - 20;
      buttons.style.width = `${buttonWidth}px`;
    }else{
      buttons.style.width = `300px`;
    }
    if(width < 706 && displayCounter == 'flex'){
      const inputsWidth = (width/100)*60 - 100;
      for(var i = 0; i < inputs.length; i++){
        inputs[i].style.width = `${inputsWidth}px`;
      }
    }else{
      if(width < 414){
        const inputsWidth = width - 100;
        for(var i = 0; i < inputs.length; i++){
          inputs[i].style.width = `${inputsWidth}px`;
        }
      }else{
        for(var i = 0; i < inputs.length; i++){
          inputs[i].style.width = `300px`;
        }
      }
    }
    if(width < 526){
      container.style.display = 'block';
      container.style.border = '1px solid rgb(238, 232, 232)';
      contentPart.style.width = '100%';
      contentPart.style.paddingTop = '24px';
      contentPart.style.paddingBottom = '24px';
      buttonsHome.style.width = '100%';
      buttonsHome.style.marginTop = '24px';
      displayCounter = 'block';
      inputsHome1.style.paddingLeft = '10px';
      inputsHome1.style.paddingRight = '10px';
      inputsHome2.style.paddingLeft = '10px';
      inputsHome2.style.paddingRight = '10px';
    }else{
      container.style.display = 'flex';
      container.style.border = '1px solid rgb(96, 203, 238)';
      contentPart.style.width = '60%';
      contentPart.style.paddingTop = '0px';
      contentPart.style.paddingBottom = '0px';
      buttonsHome.style.width = '40%';
      buttonsHome.style.marginTop = '0px';
      inputsHome1.style.paddingLeft = '30px';
      inputsHome1.style.paddingRight = '30px';
      inputsHome2.style.paddingLeft = '30px';
      inputsHome2.style.paddingRight = '30px';
      displayCounter = 'flex';
    }
  }, 1000/30);
  container.style.height = `${height}px`;

  const signUpName = document.getElementById('sign-up-name');
  const signUpSurname = document.getElementById('sign-up-surname');
  const signUpUsername = document.getElementById('sign-up-username');
  const signUpPassword = document.getElementById('sign-up-password');

  const signInUsername = document.getElementById('sign-in-username');
  const signInPassword = document.getElementById('sign-in-password');

  const inputArr = [
    signUpName, signUpSurname, signUpUsername, signUpPassword,
    signInUsername, signInPassword
  ];

  const signUpForm = document.getElementById('sign-up-form');
  const signInForm = document.getElementById('sign-in-form');
  const clearBorders = () => {
    for(var i = 0; i < inputArr.length; i++){
      inputArr[i].style.border = '1px solid grey';
    }
  }
  const clearContents = () => {
    for(var i = 0; i < inputArr.length; i++){
      inputArr[i].value = '';
    }
  }
  signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = signUpName.value;
    const surname = signUpSurname.value;
    const username = signUpUsername.value;
    const password = signUpPassword.value;
    clearBorders();
    if(!name){
      signUpName.style.border = '1px solid red';
    }else if(!surname){
      signUpSurname.style.border = '1px solid red';
    }else if(!username){
      signUpUsername.style.border = '1px solid red';
    }else if(!password){
      signUpPassword.style.border = '1px solid red';
    }else{
      chai.request(port)
      .post('/signUp')
      // I think ES6 is doesn't work here
      .field({
        name: name,
        surname: surname,
        username: username,
        password: password
      })
      .end((err, res) => {
        if(!err){
          const data = res.body;
          if(data.status == 200){
            clearContents();
            clearBorders();
            localStorage.setItem('username', data.username);
            localStorage.setItem('id', data.id);
            setTimeout(() => {
              window.location = '/profile';
            });
          }else{
            // Status 500
            if(data.error == 'username'){
              clearBorders();
              signUpUsername.style.border = '1px solid red';
              signUpUsername.value = '';
            }
          }
        }
      });
    }
  });
  signInForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = signInUsername.value;
    const password = signInPassword.value;
    if(!username){
      signInUsername.style.border = '1px solid red';
    }else if(!password){
      signInPassword.style.border = '1px solid red';
    }else{
      chai.request(port)
      .post('/signIn')
      .field({
        username: username,
        password: password
      })
      .end((err, res) => {
        if(!err){
          const data = res.body;
          if(data.status == 200){
            clearContents();
            clearBorders();
            localStorage.setItem('username', data.username);
            localStorage.setItem('id', data.id);
            setTimeout(() => {
              window.location = '/profile';
            });
          }else{
            clearBorders();
            signInPassword.style.border = '1px solid red';
            signInPassword.value = '';
          }
        }
      });
    }
  });
});