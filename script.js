document.addEventListener('DOMContentLoaded',function () {
  let container = document.querySelector('#container ul'),
      list_numbers = [],
      password = 123456;

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

  function generateRandomNumbers(){
    var control_number = -1;
    for (let i = 0; i < 10; i+=2) {
      let li = document.createElement('li');

      for (let j = i; j < i+ 2; j++) {
        control_number = control_number == -1 ? list_numbers[j] : control_number;

        li.innerHTML = `
          <button data-value-1=${control_number} data-value-2=${list_numbers[j]}>
            ${control_number} ou ${list_numbers[j]}
          </button>
        `
      }
      control_number = -1;
      container.appendChild(li);
    }
  }
  generateRandomArray()
  generateRandomNumbers()
})