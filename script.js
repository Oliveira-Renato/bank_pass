document.addEventListener('DOMContentLoaded',function () {
  let container = document.querySelector('#container ul'),
      list_numbers = [],
      valid_password = true,
      validador = '';
      password = [1,2,3,4,5,6],
      counter = 0;

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
    var control_number = -1;
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

    if(counter < password.length){
      for (let i = counter; i < password.length; i++) {
        if(valid_password) {
          for (let idxArray = 0; idxArray < array_pass.length; idxArray++) {

            if(array_pass[idxArray] == password[i] && validador.indexOf(array_pass[idxArray]) < 0) {
              validador += array_pass[idxArray];
              counter += 1;
              valid_password = true;
              return
            }else {
              valid_password = false;
            }
          }
          counter += 1;
        }else {
          return
        }
      }
    }else{
      let confirm_pass = password.toString().replace(/\,/g,'');
      confirm_pass === validador ? console.log('Senha Correta') : console.log('Senha inválida');
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
})