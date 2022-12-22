const submit = document.getElementById("submit");
const confirm = document.getElementById("confirm");
const notvalid = document.getElementsByClassName("error");
var counter = 0;
function validation(id, pattern, message, num) {
  const element = document.getElementById(id);
   if (!element.value.match(pattern)) {
    notvalid[num].textContent = message;
    notvalid[num].style.color = "red";
    counter++;
  } else {
    notvalid[num].textContent = "";
  }
}
function matchPassword() {
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("confirmPassword");
  if (password.value === confirmPassword.value) {
    confirm.textContent = "";
  } else {
    confirm.textContent = "Passwords did not match";
  }
}

submit.addEventListener("click", function (e) {
  e.preventDefault();
  counter = 0;
  validation(
    "name",/^[^0-9][a-z0-9]*[^0-9]{4,15}$/i,"Username must consist of 5 to 15 characters, only letters and numbers are allowed, with no numbers at the beginning or the end",0 );
  validation(
    "email",/^([a-z0-9_\.]{3,15})@([a-z]{4,7})\.([a-z]{2,5})/i,"Email must be in a valid format", 1);
  validation("password",/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must be at least 8 characters",2  );
  validation("confirmPassword",/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must be at least 8 characters",3
  );
  matchPassword();
  console.log(counter);
  if (counter === 0) {
  fetch("https://goldblv.com/api/hiring/tasks/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: `${document.getElementById("name").value}`,
      email: `${document.getElementById("email").value}`,
      password: `${document.getElementById("password").value}`,
      password_confirmation: `${
        document.getElementById("confirmPassword").value
      }`,
    }),
  }).then((response) => response.json())
    .then((response) => {console.log(JSON.stringify(response));
      localStorage.setItem( "email", `${document.getElementById("email").value}` );
     window.location.href = "login.html";
    }).catch((e) => {
      console.log(e);
    });
 }
});