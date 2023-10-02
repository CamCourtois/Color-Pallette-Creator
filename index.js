document.getElementById("color-scheme-btn").addEventListener('click', (e) => {
    e.preventDefault()
    const seedColor = document.getElementById('seed-color').value.slice(1)
    const colorMode = document.getElementById('color-mode-selector').value
    
    const apiUrl = `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${colorMode}&count=5`
    
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        let returnedColors = data.colors
        let hexColorArray = []
        returnedColors.forEach( color => {
            hexColorArray.push(color.hex.value)
        })
        renderColorPallette(hexColorArray)
    })
})

function renderColorPallette(colorArray){
    const paletteContainer = document.getElementById("color-display-container")
    let paletteHtml = ``
    
    colorArray.forEach(color =>{
        
        paletteHtml += 
        `
         <div class="color-container" >
            <div data-color="${color}" class="color-block" style="background-color: ${color}"></div>
            <h4>${color}</h4> 
         </div>
        `
    })
    
    paletteContainer.innerHTML = paletteHtml
}

document.addEventListener('click', (e) => {
    if (e.target.dataset.color) {
        console.log("color selected: " + e.target.dataset.color);
        const copiedHexValue = String(e.target.dataset.color);
        console.log(typeof copiedHexValue)
        console.log(copiedHexValue)
        navigator.clipboard.writeText(copiedHexValue)
            .then(() => {
                console.log('Text successfully copied to clipboard:', copiedHexValue);
                setTimeout(()=>{
                    let popup = document.getElementById("copied-color-popup")
                    
                    setTimeout(()=>{
                        popup.classList.add('fade-in');
                        popup.style.display = "block";
                        setTimeout(()=>{
                            popup.classList.add('fade-out');
                            setTimeout(()=>{
                                popup.style.display = "none"
                            }, 1000)
                        }, 800)
                    },550)
                    
                    
                    popup.innerText = `${copiedHexValue} copied to clipboard!`
                    
                    
                    
                    
                }, 500)

            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    } else {
        console.log("no color selected");
    }
});
