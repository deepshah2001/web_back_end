let leader = document.getElementById("leader");
let leaderbody = leader.querySelector("tbody");

show.addEventListener("click", async (e) => {
  e.preventDefault();

  clearLeaderboard();

  leader.removeAttribute("hidden");

  await axios
    .get("http://localhost:3000/premium/show-leaderboard", {
      headers: { Authorization: token },
    })
    .then((response) => {
      response.data.leaderboard.forEach((rank) => {
        showLeaderBoard(rank);
      });
    })
    .catch((err) => console.log(err));
});

function clearLeaderboard() {
  while (leaderbody.firstChild) {
    leaderbody.removeChild(leaderbody.firstChild);
  }
}

function showLeaderBoard(rank) {
  let tr = document.createElement("tr");

  tr.className = "trans";
  tr.id = "leader_heading";

  // let c1 = document.createElement('td');
  let c2 = document.createElement("td");
  let c3 = document.createElement("td");

  c2.appendChild(document.createTextNode(rank.name));

  if (rank.total_amount === null) {
    c3.appendChild(document.createTextNode(0));
  } else {
    c3.appendChild(document.createTextNode(rank.total_amount));
  }

  tr.appendChild(c2);
  tr.appendChild(c3);

  leaderbody.appendChild(tr);
}
