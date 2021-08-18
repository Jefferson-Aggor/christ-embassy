const form = document.getElementById("form");
const notify = document.querySelector(".notify");
const spinner = document.querySelector(".spinner");

// Add Data
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  spinner.style.display = "block";

  let data = {
    name: form.name.value,
    contact: form.contact.value,
    location: form.location.value,
    expectations: form.expectations.value,
  };

  const booking = await db.collection("bookings").add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  if (!booking) {
    notify.classList.add("bg-danger");
    notify.firstElementChild.innerText = "Error Reserving Seat";

    notify.style.display = "block";
    setTimeout(() => {
      notify.style.display = "none";
    }, 3000);
  }

  spinner.style.display = "none";
  notify.style.display = "block";
  setTimeout(() => {
    notify.style.display = "none";
  }, 3000);
  console.log(booking);

  form.name.value = "";
  form.location.value = "";
  form.expectations.value = "";
  form.contact.value = "";

  //  Make a Post request;
  fetch("/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
