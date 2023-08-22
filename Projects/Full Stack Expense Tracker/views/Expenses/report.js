download = document.getElementById("download");
let listItems = document.getElementById("list-item");
let token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await axios.get(
    "http://localhost:3000/user/file-downloaded",
    {
      headers: { Authorization: token },
    }
  );

  console.log(response.data.files);
  response.data.files.forEach((file) => {
    showFiles(file.url, file.createdAt);
  });
  download.addEventListener("click", generateReport);
});

function generateReport(e) {
  e.preventDefault();

  axios
    .get("http://localhost:3000/user/download", {
      headers: { Authorization: token },
    })
    .then((response) => {
      if (response.status === 200) {
        var a = document.createElement("a");
        a.href = response.data.fileUrl;
        a.download = "Expense.txt";
        a.click();
        location.reload();
      }
      console.log(response);
    })
    .catch((err) => console.log(err));
}

function showFiles(url, createdAt) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.href = url;
  a.appendChild(document.createTextNode("Expense.txt " + createdAt));

  li.appendChild(a);
  listItems.appendChild(li);
}
