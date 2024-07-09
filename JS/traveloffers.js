

function checkSignedinOrNot(){
    var LSSignedInStatus = localStorage.getItem("SignedInStatus");
    var SSSignedInStatus = sessionStorage.getItem("SignedInStatus");
  
    if (LSSignedInStatus === "true" || SSSignedInStatus === "true") {
      signedin.classList.toggle("hidden");
      signedout.classList.toggle("hidden");
    } else {};
  }