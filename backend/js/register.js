function submit() {
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("password").value

  if (password != confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  console.log({ userName: username, password: password });
  return;
}
