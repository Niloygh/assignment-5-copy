const allBtn = document.getElementById('allBtn')
const openBtn = document.getElementById("openBtn")
const closedBtn = document.getElementById("closedBtn")

allBtn.classList.remove('bg-white', 'gray')
allBtn.classList.add('bg-primary')

// console.log(allBtn, openBtn, closedBtn)



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


