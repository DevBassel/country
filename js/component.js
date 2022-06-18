let mode = true;

function change_mode() {
  let icon = document.querySelector('.mode i');
  let el = document.documentElement.style;
  if (mode) {
    // Dark
    icon.className = 'fas fa-sun';
    el.setProperty('--bg', 'hsl(207, 26%, 17%)');
    el.setProperty('--in', 'hsl(0, 0%, 100%)');
    el.setProperty('--text', 'hsl(0, 0%, 100%)');
    el.setProperty('--el', 'hsl(209, 23%, 22%)');
    el.setProperty('--shadow', 'rgba(255,255,255,.1)');
    mode = false;
  } else {
    // Light
    icon.className = 'fas fa-moon';
    el.setProperty('--bg', 'hsl(0, 0%, 98%)');
    el.setProperty('--in', 'hsl(0, 0%, 52%)');
    el.setProperty('--text', 'hsl(200, 15%, 8%)');
    el.setProperty('--el', 'hsl(0,0%,100%)');
    el.setProperty('--shadow', 'rgba(0,0,0,.1)');
    mode = true;
  }
}

function box({ flag, name, pop, region, capital }) {
  let box = document.createElement('div');
  box.className = 'box';
  box.setAttribute('data-filter', region);
  box.innerHTML = `
      <div class="box-head">
            <div class="flag">
              <img src="${flag}" alt="falg ${name}">
            </div>
          </div>
          <div class="box-body">
            <h3 data-name="${name}" class="name">${name}</h3>
            <p>Population: <span>${pop.toLocaleString('en-US')}</span> </p>
            <p>Region: <span>${region}</span></p>
            <p>Capital: <span>${capital}</span></p>
          </div>
  `;
  document.querySelector('.countrys').appendChild(box);
}

async function getData(api) {
  const data = await fetch(api);
  return await data.json();
}

function toggel() {
  document.querySelector('.filter .value').onclick = function() {
    document.querySelector('.filter-items').classList.toggle('active');
  }
}

function view({ name, src, pop, region, sub_region, capital, domin, currns, lang, b1, b2, b3 }) {
  let box = document.querySelector('.box-view');
  let langs = [];
  for (let i in lang) {
    langs.push(lang[i])
  }
  let curn;
  for (let i in currns) {
    curn = i
  }
  console.log(curn)
  box.innerHTML = `
    <div class="flag">
      <img src="${src}" alt="flag-${name}">
    </div>
        <div class="info">
          <div class="ditals">
            <div class="data">
              <h2>Name</h2>
              <p>Native Name: <span>${name}</span></p>
              <p>Population: <span>${pop.toLocaleString('en-US')}</span></p>
              <p>Region: <span>${region}</span></p>
              <p>Sub Region: <span>${sub_region}</span></p>
              <p>Capital: <span>${capital}</span></p>
            </div>
            <div class="more">
              <p>Top Level Domin: <span>${domin}</span></p>
              <p>Currencies: <span>${currns[curn].name}</span></p>
              <p>Language: <span>${langs}</span></p>
            </div>
          </div>
          <div class="borders">
            <p>Border Countries:</p>
            <div class="countrys">
              <span class="border"> ${b1} </span>
              <span class="border"> ${b2} </span>
              <span class="border"> ${b3} </span>
            </div>
          </div>
        </div>
  `;
}

function click_view(el) {
  document.querySelector('.back').onclick = () => {
    document.querySelector('.view').classList.remove('active');
    document.querySelector('.box-view').innerHTML = '';
  }


  document.querySelectorAll(el).forEach(ele => {
    ele.addEventListener('click', function() {
      document.querySelector('.view').classList.add('active');
      let name = this.querySelector('.box-body .name').dataset.name;
      console.log(name)
      getData(`https://restcountries.com/v3.1/name/${name}`).then(result => {
        let data = result[0];
        view({
          src: data.flags.png,
          name: data.name.common,
          pop: data.population,
          capital: /Palestine/i.test(name) ? 'Jerusalem' : data.capital[0],

          region: data.region,
          sub_region: data.subregion,
          domin: data.tld[0],
          currns: data.currencies,
          lang: data.languages,
          b1: data.borders[0],
          b2: data.borders[1],
          b3: data.borders[2],
        });
        console.log(data.tld[0])
      }).catch(err => console.log('Not Found in {viewing}'));;
    });
  });
}



toggel();
export {
  change_mode as mode,
  box,
  getData,
  click_view,
}