const getInfo = window.location.search;
console.log(getInfo);
const myInfo = new URLSearchParams(window.location.search);
console.log(myInfo);

document.querySelector("#results").innerHTML =

  ` 
    <p><strong>Form submitted by :</strong> ${myInfo.get("name")}</p>
    <p><strong> Your e-mail :</strong> ${myInfo.get("email")} </p>
`;
