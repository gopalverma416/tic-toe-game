 
 
 let boxes = document.querySelectorAll(".BOX");
 let resetBtn = document.querySelector("#RESET-BTN");
 let newGameBtn = document.querySelector("#NEW-BTN");
 let msgContainer = document.querySelector(".msg-container");
 let turn0 = false;
 const winPattern = [
     [0, 1, 2],
     [0, 3, 6],
     [0, 4, 8],
     [1, 4, 7],
     [2, 5, 8],
     [2, 4, 6],
     [3, 4, 5],
     [6, 7, 8],
 ];
 
 const resetGame = () => {
     turn0 = false;
     enableBoxes();
     msgContainer.classList.add("hide");
     // Clear the text content of all boxes
     boxes.forEach(box => {
         box.innerText = '';
     });
 };
 
 const disableBoxes = () => {
     for (let box of boxes) {
         box.disabled = true;
     }
 };
 
 const enableBoxes = () => {
     for (let box of boxes) {
         box.disabled = false;
     }
 };
 
 const showWinner = (winner) => {
     msgContainer.innerText = `Congratulations, WINNER is ${winner}`;
     msgContainer.classList.remove("hide");
 };
 const mark = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false;
        }
    }
    return true;
}
 
const checkWinner = () => {
    let winnerFound = false; // Variable to track if a winner is found
    
    // Check for winning patterns
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("winner", pos1Val);
            showWinner(pos1Val);
            disableBoxes(); // Disable boxes after a winner is found
            winnerFound = true; // Set the winnerFound flag to true
            break; // Exit the loop if a winner is found
        }
    }
    
    // If no winner is found and all boxes are marked, it's a draw
    if (!winnerFound && mark()) {
        console.log("NO ONE IS WINNER");
        // Handle the draw condition here if needed
    }
};

 
 boxes.forEach((BOX) => {
     BOX.addEventListener("click", () => {
         console.log("box was clicked");
         if (BOX.innerText === "") { // Only allow placing a mark if the box is empty
             if (turn0) {
                 BOX.innerText = "0";
                 turn0 = false;
             } else {
                 BOX.innerText = "x";
                 turn0 = true;
             }
             checkWinner(); // Check for winner after each move
         }
     });
 });
 
 newGameBtn.addEventListener("click", resetGame);
 resetBtn.addEventListener("click", resetGame);
 
