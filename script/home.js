console.log("home running");
let allIssues = [];
const loadingSpinner = document.getElementById("loading-spinner");
const categoryContainer = document.getElementById("category-container");
const cardContainer = document.getElementById("card-container");
const numberUpdate = document.getElementById("numberUpdate")
function showLoading() {
    loadingSpinner.classList.remove("hidden");
    cardContainer.innerHTML = ""
}
function hideLoading() {
    loadingSpinner.classList.add("hidden");
}
async function loadCategories() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data;


    const allBtn = document.getElementById("allBtn");

    allBtn.onclick = () => {
        displayAllIssues(allIssues)
        numberUpdate.innerText = allIssues.length
    }
    const statuses = [...new Set(allIssues.map(issue => issue.status))];

    statuses.forEach(status => { btn.onclick = () => {selectCategory(status);
             btn.classList.add('text-white', 'bg-blue-950');
        btn.classList.remove('btn-outline')
        const btn = document.createElement("button");
        btn.className = "btn w-[85px]";
        btn.textContent = status;
 btn.onclick = () => selectCategory(status);
             btn.classList.add('text-white', 'bg-blue-950');
        btn.classList.remove('btn-outline')
       
        const allButton = document.querySelectorAll("#category-container button,#allBtn");
        console.log(allButton);
        allButton.forEach((btn) => {
            btn.classList.remove('text-white', 'bg-blue-950');
            btn.classList.add('btn')
        })
       
            
        }

categoryContainer.appendChild(btn);
       

    } 
);
}
async function selectCategory(status) {
    console.log(status);
    showLoading()
    const filteredIssues = allIssues.filter(issue => issue.status === status);

    displayAllIssues(filteredIssues);
    hideLoading()

    if (status == "open" || status == "closed") {
        numberUpdate.innerText = filteredIssues.length;

    }
    else {
        numberUpdate.innerText = allIssues.length
    }
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
        const issueStatus = issueCard.querySelector("#issuestatus");
        if (issue.status == "open") {
            issueStatus.innerHTML = `<img src="assets/Open-Status.png">`
        }
        else {
            issueStatus.innerHTML = `<img src="assets/Closed- Status .png">`
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
            else if (label === "good first issue") {
                issueLabel.innerHTML += `
        <div class="badge badge-outline  badge-success">
        Good first issue
        </div>`;
            }
            else {
                issueLabel.innerHTML += `
        <div class="badge badge-outline  badge-primary">
       Documentation
        </div>`;
            }
        });
    })
}


loadCategories()