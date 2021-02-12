const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
 const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


/*
const dummyTransactions =[
    {id:1,date:'5April',amount: -20},
   {id:2,date:'24August',amount: 10},
   {id:3, date:'4Feb',  amount:-50},
  {id:4, date:'14may',amount: 190}
]
*/

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null  ?  localStorageTransactions : [];




//Add transacations
function addTransaction(e){
  e.preventDefault();
     
   if (text.value.trim() === '' || amount.value.trim() === '') 
      { alert('please add a date and amount') 

}

else {
  const transaction = {
    id:generateID(),
    date: text.value,
    amount:+amount.value
  }
   
  transactions.push(transaction);

  addTransactionDom(transaction);

   updateValues();
   
   updateLocalStorage();



   text.value = '';
   amount.value ='';

   }

}
// generate random ID
function generateID (){
  return Math.floor(Math.random() * 10000000)
}

//add transactions to DOM list
 function addTransactionDom (transaction){
     //get sign
     const sign = transaction.amount < 0 ? '-' : '+';

     const item = document.createElement('li');

 // add class based on value
 item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

 item.innerHTML = ` ${transaction.date} 
 <span>${sign}${Math.abs(transaction.amount)}</span> 
 <button class = "delete-btn" onclick = 'removeTransaction(${transaction.id}) '>x</button> `;


list.appendChild(item);

 }

 // update the balance , deposit and withdraw

 function updateValues(){
   const amounts = transactions.map(transaction => transaction.amount);

   const total = amounts.reduce((acc, item) => (acc += item), 0)
   .toFixed(2);


  const deposit = amounts
     .filter(item =>  item > 0)
     .reduce((acc, item) => (acc += item), 0) 
     .toFixed(2);

const withdraw = (amounts
      .filter(item => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1)
      .toFixed(2)

      console.log(withdraw);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${deposit}`;
    money_minus.innerText =`$${withdraw}`;
 }
 //update local storage transactions
 function updateLocalStorage() {
   localStorage.setItem('transactions' ,JSON.stringify(transactions))
 }


   // remove transaction by Id 
   function removeTransaction(id){
     transactions = transactions.filter(transaction => transaction.id !== id);


     updateLocalStorage();


     init()
   }

   // Init app
  function init  () {
   list.innerHTML = '';

   transactions.forEach(addTransactionDom);
   
   updateValues()

 }
  init();


form.addEventListener('submit',addTransaction)


