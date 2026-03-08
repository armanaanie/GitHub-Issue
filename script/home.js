console.log("home running");

const categoryContainer = document.getElementById("category-container");
const cardContainer = document.getElementById("card-container")
async function loadCategories() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displayAllIssues(data.data)
    const statuses = [...new Set(data.data.map(item => item.status))];


    statuses.forEach((status) => {
        const btn = document.createElement("button");
        btn.className = "btn w-[85px]";
        btn.innerText = status;
        categoryContainer.appendChild(btn);
    });
}
/*"id": 1,
      "title": "Fix navigation menu on mobile devices",
      "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
      "status": "open",
      "labels": [
        "bug",
        "help wanted"
      ],
      "priority": "high",
      "author": "john_doe",
      "assignee": "jane_smith",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },*/
function displayAllIssues(issues) {
    console.log(issues)
    issues.forEach((issue) => {
        const issueCard = document.createElement("div");
        issueCard.className = "card bg-base-100  shadow-sm";
        issueCard.innerHTML = `
        <div class="card-body">
            <div class="flex justify-between items-center"><p id="issuestatus">${issue.status}</p>
                <div class="badge bg-gray-200 text-gray-500">${issue.priority}</div>
            </div>
            <h2 class="card-title">
                ${issue.title}

            </h2>
            <p class="text-gray-500">${issue.description}</p>

            <div class="card-actions justify-between issueLevel" >
                
                
        </div>
        <div class="p-4 border border-gray-200 text-gray-500 text-xs space-y-2">
            <p>#1 by ${issue.author}</p>
            <p>${issue.createdAt}</p>
        </div> </div>`

        cardContainer.appendChild(issueCard);
        const issueStatus= issueCard.querySelector("#issuestatus");
        if(issue.status=="open"){
           issueStatus.innerHTML=`<img src="assets/Open-Status.png">` 
        }
        else{
             issueStatus.innerHTML=`<img src="assets/Closed- Status .png">`
        }
        const issueLabel = issueCard.querySelector(".issueLevel");

issue.labels.forEach(label => {

    if (label === "bug") {
        issueLabel.innerHTML += `
        <div class="badge badge-outline badge-error">
        <img src="./assets/BugDroid.png" alt=""> Bug
        </div>`;
    }

    else if (label === "help wanted") {
        issueLabel.innerHTML += `
        <div class="badge badge-outline badge-warning">
        <img src="./assets/Vector.png" alt=""> Help wanted
        </div>`;
    }

    else if (label === "enhancement") {
        issueLabel.innerHTML += `
        <div class="badge badge-outline badge-accent">
        <img src="./assets/Sparkle.png" alt=""> Enhancement
        </div>`;
    }

});
            })
    }


loadCategories()