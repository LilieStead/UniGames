function customPopup(message){
    const popup = document.getElementById('custom-popup');
    const popupMessage = document.getElementById('popup-message');
    popupMessage.innerText = message;
    popup.style.display = 'flex';
}

function closePopup(){
    const popup = document.getElementById('custom-popup');
    popup.style.display = 'none';
}

document.getElementById('close-popup').addEventListener('click', closePopup);