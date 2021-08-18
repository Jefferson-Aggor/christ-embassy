const tableBody = document.getElementById("table-body");
const bookings = document.querySelector(".bookings");
const progressUI = document.getElementById("progress");
const spinner = document.querySelector(".spinner");
const overall_num = document.querySelector(".overall-num");
const progress_val = document.querySelector(".progress-val");
const notify = document.querySelector(".notify");

let expected_num = 250;
spinner.style.display = "block";

notify.classList.add("bg-danger");

// Render data
function renderData(doc) {
  tableBody.innerHTML += `<tr>
      
  <td>${doc.data().name}</td>
  <td>${doc.data().location}</td>
  <td> <a href="tel:${doc.data().contact}">${doc.data().contact}</a></td>
</tr>`;
}

db.collection("bookings")
  .get()
  .then((data) => {
    spinner.style.display = "none";
    overall_num.innerText = data.docs.length;
    let progress = Math.round((data.docs.length / expected_num) * 100);

    progress_val.innerText = `${progress}%`;
    progressUI.style.borderWidth = progress;
    progressUI.style.color = "green";

    if (data.docs.length === 0) {
      bookings.innerHTML += `<p class='text-danger alert-text mt-3'>Bad Internet Connection</p>`;
    }

    data.docs.forEach((doc) => {
      renderData(doc);
    });
  })
  .catch((err) => {
    notify.style.display = "block";
    setTimeout(() => {
      notify.style.display = "none";
    }, 3000);
    console.log(err);
  });
