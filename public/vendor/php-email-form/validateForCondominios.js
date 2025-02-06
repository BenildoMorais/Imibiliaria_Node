
document.getElementById('condominioForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  let casas = [];
  document.querySelectorAll('[type=checkbox]').forEach(item => {
    if(item.checked === true){
      casas.push(item.value);
    };
  });

  console.log(casas);

  document.getElementById('casas').value = casas;

  this.submit(); 
});