let currentStatus = 'all'


const allBtn = document.getElementById('allBtn')
const openBtn = document.getElementById("openBtn")
const closedBtn = document.getElementById("closedBtn")
const count = document.getElementById('count')
const cardContainer = document.getElementById('card-container')
const spinner = document.getElementById('spinner')
const modal = document.getElementById('modal')


// console.log(allBtn, openBtn, closedBtn)

allBtn.classList.remove('bg-white', 'gray')
allBtn.classList.add('bg-primary')


allBtn.addEventListener('click', () => {
    currentStatus = 'all';
    switchTab('all')  // no use
    cardFilter('all')
})
openBtn.addEventListener('click', () => {
    currentStatus = 'open'
    switchTab('open')  // no use
    cardFilter('open')
})
closedBtn.addEventListener('click', () => {
    currentStatus = 'closed'
    switchTab('closed')  // no use
    cardFilter('closed')
})


// btn toggle
allBtn.onclick = () => switchTab('allBtn')
openBtn.onclick = () => switchTab('openBtn')
closedBtn.onclick = () => switchTab('closedBtn')

function switchTab(tab) {
    if (tab === 'allBtn') {
        allBtn.classList.remove('bg-white', 'gray')
        allBtn.classList.add('bg-primary')

        openBtn.classList.add('bg-white', 'gray')
        openBtn.classList.remove('bg-primary')

        closedBtn.classList.add('bg-white', 'gray')
        closedBtn.classList.remove('bg-primary')
    }

    if (tab === 'openBtn') {
        openBtn.classList.remove('bg-white', 'gray')
        openBtn.classList.add('bg-primary')

        allBtn.classList.add('bg-white', 'gray')
        allBtn.classList.remove('bg-primary')

        closedBtn.classList.add('bg-white', 'gray')
        closedBtn.classList.remove('bg-primary')
    }

    if (tab === 'closedBtn') {
        closedBtn.classList.remove('bg-white', 'gray')
        closedBtn.classList.add('bg-primary')

        allBtn.classList.add('bg-white', 'gray')
        allBtn.classList.remove('bg-primary')

        openBtn.classList.add('bg-white', 'gray')
        openBtn.classList.remove('bg-primary')
    }
}

// spinner 
function showSpinner() {
    spinner.classList.remove('hidden')
    cardContainer.innerHTML = "";
}
function hideSpinner() {
    spinner.classList.add('hidden')
}

function updateTotalCount() {
    const allCard = document.querySelectorAll('#card-container .card')

    let sum = 0;
    allCard.forEach(card => {
        if (card.style.display !== 'none') sum++;
    })
    count.innerText = sum;

}


function cardFilter(status) {
    const allCard = document.querySelectorAll('#card-container .card')

    allCard.forEach(i => {
        // console.log(i)
        if (status === 'all') {
            i.style.display = 'block'
        }
        else {
            i.style.display = i.dataset.status === status ? 'block' : 'none'
        }
    })
    updateTotalCount()
}


async function allLoadCard() {
    showSpinner()
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await res.json()
    // console.log(data)
    hideSpinner()
    displayCard(data.data)
}

function displayCard(cards) {
    // console.log(cards)

    //     {
    // "id": 48,
    // "title": "Browser console shows warnings",
    // "description": "Multiple deprecation warnings appearing in browser console. Need to update deprecated code.",
    // "status": "open",
    // "labels": [
    //     "bug"
    // ],
    // "priority": "low",
    // "author": "console_carol",
    // "assignee": "",
    // "createdAt": "2024-02-09T14:20:00Z",
    // "updatedAt": "2024-02-09T14:20:00Z"
    // }

    count.innerText = cards.length

    cardContainer.innerHTML = '';
    cards.forEach(card => {
        // console.log(card)
        const div = document.createElement('div')
        div.className = 'card bg-base-100 shadow-sm mt-10 space-y-5'
        div.dataset.status = card.status

        div.innerHTML = `
        <div class="h-1 rounded-t-2xl ${card.status === 'open' ? 'bg-primary' : 'bg-green'}"></div>
            <div class="flex justify-between px-4 ">
                <img src=${card.status === 'open' ? 'assets/Open-Status.png' : 'assets/Closed-Status.png'} alt="">
                <div class="${card.priority === 'high' ? 'pink' : card.priority === 'medium' ? 'orange' : 'silver'}">
                    <p>${card.priority.toUpperCase()}</p>
                </div>
            </div>
            <div class="px-4">
                <h1 onClick="showModal(${card.id})" class="text-[20px] font-semibold mb-2">${card.title}</h1>
                <p>${card.description}</p>
            </div>
            <div class="flex gap-2 flex-wrap px-4">
                ${card.labels.map(item =>
            `
                    <span class="flex items-center gap-1 ${item === 'bug' ? 'pink-color' : item === 'help wanted' ? 'yellow-color' : 'enhancement-color'}">

                    ${item === 'bug' ? '<img src="assets/bug.png" alt="">' : item === 'help wanted' ? '<img src="assets/help-wanted.png" alt="">' : '<img src="assets/enhancement.png" alt="">'}
                    ${item.toUpperCase()}</span>
                    `
        ).join("")}
            </div>
            <hr class="text-black/20">
            <div class="px-4 pb-4">
                <p>${card.author}</p>
                <p>${card.createdAt}</p>
            </div>  
        `
        
        div.addEventListener('click', function(){
            showModal(card.id)
        })
        
        cardContainer.append(div)
        cardFilter(currentStatus)
        updateTotalCount()
    });

}



// search option 
// async function search(){
//     const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${title}`) 
// }
document.getElementById('search')
    .addEventListener('click', async (e) => {
        try {
            const searchInput = document.getElementById('searchInput')
            const searchValue = searchInput.value.toLowerCase().trim();
            currentStatus = 'all';

            const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)

            if (!res.ok) {
                throw new Error("Response not OK")
            }

            const data = await res.json()
            displayCard(data.data)
            if(!data.data || data.data.length === 0){
                cardContainer.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">No results found</p>`
            }

            console.log(data)
        }catch(error){
            console.log('Fetch error:', error)
        }
        switchTab('allBtn')        
    })

document.getElementById('searchInput').addEventListener('keypress', (e)=>{
    const search = document.getElementById('search')
    if(e.key === 'Enter'){
        search.click()
    }
})

// modal 
async function showModal(id){
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    const jsonData  = await res.json();
    const card = jsonData.data

    console.log(card)

//     {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }
    
    modal.innerHTML = `
    <div class="modal-box">
                    <div class="space-y-5">
                        <h1 class="text-2xl font-semibold">${card.title}</h1>
                        <div class="flex items-center gap-2 space-x-4">
                            <p class="bg-green text-white px-2 rounded-2xl font-semibold">${card.status.toUpperCase()}</p>
                            <ul class="flex list-disc space-x-8">
                                <li>Opened by ${card.author}</li>
                                <li>${card.createdAt}</li>
                            </ul>
                        </div>
                        <div class="flex gap-2 flex-wrap px-4">
                ${card.labels.map(item =>
            `
                    <span class="flex items-center gap-1 ${item === 'bug' ? 'pink-color' : item === 'help wanted' ? 'yellow-color' : 'enhancement-color'}">

                    ${item === 'bug' ? '<img src="assets/bug.png" alt="">' : item === 'help wanted' ? '<img src="assets/help-wanted.png" alt="">' : '<img src="assets/enhancement.png" alt="">'}
                    ${item.toUpperCase()}</span>
                    `
        ).join("")}
            </div>
            <hr class="text-black/20">
            <div class="px-4 pb-4">
                <p>${card.author}</p>
                <p>${card.createdAt}</p>
            </div>  
                        <p>${card.description}</p>
                        <div class="flex gap-25 bg-black/10 p-3">
                            <div class="">
                                <p>Assignee:</p>
                                <p class="font-semibold">${card.assignee}</p>
                            </div>
                            <div class="">
                                <p>Priority:</p>
                                <p class="bg-red px-2 rounded-2xl font-semibold">${card.priority.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
    `;
    
    modal.showModal()
    
}

allLoadCard()