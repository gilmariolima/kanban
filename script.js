document.querySelectorAll(".card").forEach(card=>{
    card.addEventListener("dragstart", event=>{
        event.currentTarget.classList.add("dragging")
    })
    card.addEventListener("dragend", event=>{
        event.currentTarget.classList.remove("dragging")
    })
})

document.querySelectorAll(".coluna").forEach(coluna=>{
    coluna.addEventListener("dragover", event =>{
        event.preventDefault();
        event.currentTarget.classList.add("coluna-hover")
    })
    coluna.addEventListener("dragleave", event=>{
        event.currentTarget.classList.remove("coluna-hover")
    })
    coluna.addEventListener("drop", event=>{
        event.currentTarget.classList.remove("coluna-hover")
        
        const dragcard = document.querySelector(".dragging")
        event.currentTarget.appendChild(dragcard)
    })
})