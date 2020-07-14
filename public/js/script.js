console.log("Client Side JavaScript loaded successfully");


const form = document.querySelector('form');
const searchTerm = document.querySelector('.searchLocation');
var msg1 = document.querySelector('.message1');
var msg2 = document.querySelector('.message2');
msg1.textContent = " ";

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    msg1.textContent = "Loading..."
    msg2.textContent = " ";
        //console.log(button2.value)
    const data = searchTerm.value;
    fetch('http://localhost:3000/weather?address='+data).then(response=>{
    //console.log(response);
    response.json().then(data=>{
       if(data.error){
           console.log(data.error);
           msg1.textContent = data.error;
         
       }
       else{
           console.log(data);
           msg1.textContent = data.location;
           msg2.textContent = data.forecastData;
       }
    })
   })    
})

