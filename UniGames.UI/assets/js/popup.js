function customPopup(message){
    const popup = document.getElementById('custom-popup');
    const popupMessage = document.getElementById('popup-message');
    popupMessage.innerText = message;
    popup.style.display = 'flex';
}

// Function made to display multiple messages on one popup, not multiple popups
function multi_Popup(messages){
    const popup = document.getElementById('custom-popup');
    const popupMessage = document.getElementById('popup-message');
    
    // Join the messages into a single string
    const combinedMessage = messages.join('\n');
    
    popupMessage.innerText = combinedMessage;
    popupMessage.style.lineHeight = 2;
    popup.style.display = 'flex';
}

function closePopup(){
    const popup = document.getElementById('custom-popup');
    popup.style.display = 'none';
}

document.getElementById('close-popup').addEventListener('click', closePopup);