document.addEventListener('DOMContentLoaded',function () {
  let container = document.querySelector('#container ul'),
      pass_input = document.querySelector('.pass-output'),
      password = [1,2,3,4,5,6],//Não pode números repetidos, questão de segurança.
      list_numbers = [],
      valid_password = true,
      validador = '';

  function generateRandomArray() {
    let ramdom_number = Math.floor(Math.random() * 10);

    while(list_numbers.length < 10) {
      if(list_numbers.indexOf(ramdom_number) >-1 ){
        generateRandomArray();
      }else {
        list_numbers.push(ramdom_number);
      }
    }
  }

  function handleOutputPassword(){
    let control_number = -1;

    for (let i = 0; i < 10; i+=2) {
      let li = document.createElement('li');

      for (let j = i; j < i+ 2; j++) {
        control_number = control_number == -1 ? list_numbers[j] : control_number;

        li.innerHTML = `
          <button class="button_pass" data-value-1=${control_number} data-value-2=${list_numbers[j]}>
            ${control_number} ou ${list_numbers[j]}
          </button>
        `
      }
      control_number = -1;
      container.appendChild(li);
    }
  }
  function valid(array_pass){
    valid_password = true;

    for (let i = validador.length; i < password.length; i+= 2) {
      if(valid_password) {
        for (let idxArray = 0; idxArray < array_pass.length; idxArray++) {
          if(array_pass[idxArray] == password[i] && validador.indexOf(array_pass[idxArray]) < 0) {
            validador += array_pass[idxArray];
            pass_input.value = validador;
            valid_password = true;
            return
          }else {
            valid_password = false;
          }
        }
        validador += '0'
        pass_input.value = validador;
      }
    }
    
  }
  function verifyingPassword() {
    let array_pass = [];
    const buttons = document.querySelectorAll('.button_pass');
    
    Object.keys(buttons).forEach(item => {    
      buttons[item].addEventListener('click', function(){
        array_pass.push(buttons[item].dataset["value-1"]);
        array_pass.push(buttons[item].dataset["value-2"]);
        valid(array_pass)
        console.log(validador)
        array_pass= [];
      })
    })
  }
  generateRandomArray();
  handleOutputPassword();
  verifyingPassword();

  document.querySelector('.confirm-pass').addEventListener('click',function(e){
    e.preventDefault();
    if(validador == password.toString().replace(/\,/g,'')) {
      alertify.success('Senha Correta!');
    }else {
      alertify.error('Senha Incorreta!');
    }
  })
})
