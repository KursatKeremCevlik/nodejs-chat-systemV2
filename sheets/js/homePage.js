$(() => {
  let width = this.innerWidth;
  let height = this.innerHeight - 32;

  const container = document.getElementById('container');
  const contentPart = document.getElementById('contentPart');
  const buttonsHome = document.getElementById('buttons-home');
  const buttons = document.getElementById('buttons');
  const inputs = document.querySelectorAll('input');
  const signUp = document.getElementById('sign-up');
  const signIn = document.getElementById('sign-in');

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
    }else{
      container.style.display = 'flex';
      container.style.border = '1px solid rgb(96, 203, 238)';
      contentPart.style.width = '60%';
      contentPart.style.paddingTop = '0px';
      contentPart.style.paddingBottom = '0px';
      buttonsHome.style.width = '40%';
      buttonsHome.style.marginTop = '0px';
      displayCounter = 'flex';
    }
  }, 1000/30);

  container.style.height = `${height}px`;
});