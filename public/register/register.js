$(document).ready(e => {
  // Initialize Firebase
    var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };
  firebase.initializeApp(config);

  $("#signUp").on("click", e => {
    const email = $("#email").val();
    const password = $("#password").val();
    const auth = firebase.auth();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(e => {
        auth.signInWithEmailAndPassword(email, password).then(e => {
          window.location.href = "../index.html";
        });
      })
      .catch(function(error) {
        const errorMessage = error.message;
        $(`<div class="alert alert-danger" role="alert">
		  ${errorMessage}
		</div>`).insertBefore($("#error"));
        const timer = setTimeout(e => {
          $(".alert-danger").hide();
        }, 3000);
      });
  });
});
