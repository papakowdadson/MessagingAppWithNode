const numberInput = document.getElementById("number");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("button");

sendButton.addEventListener("click", send, false);

//catch emittting message
// const socket = io();



function send() {
  console.log('sending...................')
const from = 'Aims community';
const to = numberInput.value.replace(/\D/g,"");
const text = messageInput.value;

console.log(`${to} + ${from} + ${text}`)

  fetch("/", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ from: from, to: to, text: text }),
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
