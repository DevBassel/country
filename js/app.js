import { mode, box, getData, click_view} from './component.js';


// Change Mode 
document.querySelector('.mode').onclick = mode;
let input = document.querySelector('input');

// fond country with searching
input.addEventListener('blur', function() {
  let val = this.value;
  if (val != '') {
    if (/(isr|israel)/i.test(val)) {
      val = 'Palestine';
    }
    document.querySelector('.countrys').innerHTML = '';
    let api = `https://restcountries.com/v3.1/name/${val}`;
    getData(api).then(function(data) {
      console.log(data)
      data = data[0];
      box({
        flag: data.flags.png,
        name: data.name.common,
        pop: data.population,
        capital: /Palestine/i.test(val) ? 'Jerusalem' : data.capital[0],
        region: data.region
      });
        click_view('.box');

    }).catch(err => console.log('Not Found in {searching}'));
  }

});
//  render country on loade
getData('https://restcountries.com/v3.1/all').then(function(result) {
  for (let i = 0; i < 8; i++) {
    let data = result[i];
    box({
      flag: data.flags.png,
      name: data.name.common,
      pop: data.population,
      capital: data.capital[0],
      region: data.region
    });
  }
  click_view('.box');
}).catch(err => console.log('Not Found in {render}'));
