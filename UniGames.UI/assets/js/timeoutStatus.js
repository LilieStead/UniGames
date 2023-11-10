// Function to check if passwordTimeout function is active
function timeoutStatus(){
    const curTime  = sessionStorage.getItem('passwordTimeout');
    // If it is active then
    if (curTime){
        // Converts the current time left into a base-10 integer
        const endTime = parseInt(curTime, 10);
        // Specifies if the cooldown is actually active if both are true
        return !isNaN(endTime) && Date.now() < endTime;
    }
    // Cooldown is not active
    return false;
}