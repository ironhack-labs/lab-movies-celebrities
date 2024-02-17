document.addEventListener("DOMContentLoaded", () => {

    //name
    document.getElementById("edit-name-btn").onclick = function(){
        document.getElementById("celeb-name").style.display = "none";
        document.getElementById("edit-name-btn").style.display = "none";
        document.getElementById("subtitle-1").style.display = "none";
        document.getElementById("edit-name").style.display = "block";
    }

    function restoreNameDOM(){
        document.getElementById("celeb-name").style.display = "block";
        document.getElementById("edit-name-btn").style.display = "block";
        document.getElementById("subtitle-1").style.display = "block";
        document.getElementById("edit-name").style.display = "none";
    }


    document.getElementById("cancel-name").onclick = function(){
        restoreNameDOM();
    }

    document.getElementById("submit-name").onclick = async ()=>{
        const newName = document.querySelector("#edit-name input").value;
        const id = document.getElementById("edit-name").dataset.id;

        const update = await axios.post(`/celebrities/api/edit/${id}`, {name: newName});
        restoreNameDOM();
        document.getElementById("celeb-name").innerText = update.data.name;     
    }


    //occupation
    document.getElementById("edit-occupation-btn").onclick = function(){
        document.getElementById("celeb-occupation").style.display = "none";
        document.getElementById("edit-occupation-btn").style.display = "none";
        document.getElementById("subtitle-2").style.display = "none";
        document.getElementById("edit-occupation").style.display = "block";
    }

    function restoreOccupationDOM(){
        document.getElementById("celeb-occupation").style.display = "block";
        document.getElementById("edit-occupation-btn").style.display = "block";
        document.getElementById("subtitle-2").style.display = "block";
        document.getElementById("edit-occupation").style.display = "none";
    }


    document.getElementById("cancel-occupation").onclick = function(){
        restoreOccupationDOM();
    }

    document.getElementById("submit-occupation").onclick = async ()=>{
        const newOccupation = document.querySelector("#edit-occupation input").value;
        const id = document.getElementById("edit-occupation").dataset.id;

        const update = await axios.post(`/celebrities/api/edit/${id}`, {occupation: newOccupation});
        restoreOccupationDOM();
        document.getElementById("celeb-occupation").innerText = update.data.occupation;     
    }

    //catch phrase
    document.getElementById("edit-catchPhrase-btn").onclick = function(){
        document.getElementById("celeb-catchPhrase").style.display = "none";
        document.getElementById("edit-catchPhrase-btn").style.display = "none";
        document.getElementById("subtitle-3").style.display = "none";
        document.getElementById("edit-catchPhrase").style.display = "block";
    }

    function restoreCatchPhraseDOM(){
        document.getElementById("celeb-catchPhrase").style.display = "block";
        document.getElementById("edit-catchPhrase-btn").style.display = "block";
        document.getElementById("subtitle-3").style.display = "block";
        document.getElementById("edit-catchPhrase").style.display = "none";
    }


    document.getElementById("cancel-catchPhrase").onclick = function(){
        restoreCatchPhraseDOM();
    }

    document.getElementById("submit-catchPhrase").onclick = async ()=>{
        const newCatchPhrase = document.querySelector("#edit-catchPhrase input").value;
        const id = document.getElementById("edit-catchPhrase").dataset.id;

        const update = await axios.post(`/celebrities/api/edit/${id}`, {catchPhrase: newCatchPhrase});
        console.log(update);
        // const celeb = await axios.get(`/celebrities/api/details/${id}`);
        // console.log(celeb);
        restoreCatchPhraseDOM();
        // document.getElementById("celeb-catchPhrase").innerText = celeb.data.celebrity.catchPhrase;     
        document.getElementById("celeb-catchPhrase").innerText = update.data.catchPhrase;     

    }
});