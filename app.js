const getUrl = e => {
    e.preventDefault();

     // Get input value
     let input = document.getElementById('url');
     let error = document.getElementById('error');

     if(input.value === ''){
          input.style.border = '2.5px solid hsl(0, 87%, 67%)';
          error.style.display = 'block';
     } else {
        input.style.border = 'none';
        error.style.display = 'none';
         
        
        // Fetch rebrandly api
        fetch(" https://rel.ink/api/links/", {
            method: "POST",
            body: JSON.stringify({
              url: input.value
            }),
            headers: {
              "content-type": "application/json"
            }
          })
          .then(res => res.json())
          .then(data => {
               let div = document.createElement('div');
               div.className = 'main-link';

               let link = document.createElement('div');
               link.className = 'input-link';

               let a = document.createElement('a');
               a.className = 'black-color';

               //Create text node for a tag
               let blackLink = document.createTextNode(`${input.value}`);
               
               a.appendChild(blackLink);

               link.appendChild(a);

               div.appendChild(link);

               let shorten = document.createElement('div');
               shorten.className = 'shorten-link';

               let linkShort = document.createElement('a');
               linkShort.className = 'primary-color';

               let primaryLink = document.createTextNode(`https://rel.ink/${data.hashid}`);

               linkShort.appendChild(primaryLink);

               let button = document.createElement('button');

               button.className = 'copy';

               let buttonText = document.createTextNode('Copy');

               button.appendChild(buttonText);
               
               shorten.appendChild(linkShort);

               shorten.appendChild(button);

               div.appendChild(shorten);

               const final = document.querySelector('.shorten');

               final.appendChild(div);

               

               //add event listener to button to change color and text 
               document.querySelectorAll('.copy').forEach(item => {
                item.addEventListener('click', event => {
                  item.style.backgroundColor = 'hsl(257, 27%, 26%)';
                  item.textContent = 'Copied!';

                  let copied = document.querySelector('.primary-color');

                   
                })
              })
          })
     }
}

const show = () => {
  const nav = document.querySelector('.nav-left ul');
  const navs = document.querySelector('.nav-right ul');
  
  nav.classList.toggle('show-nav');
  navs.classList.toggle('show-nav'); 
   
}

document.querySelector('form').addEventListener('submit', getUrl);
document.querySelector('.hamburger').addEventListener('click', show);