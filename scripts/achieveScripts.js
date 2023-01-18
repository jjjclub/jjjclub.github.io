// You must edit this javascript to somehow have an event listener to the button ".achieveBoxes" when gets clicked
// So it doesnt have to be at the bottom of the page.
// The current system does not work if you put the script at the top of the page because it gets loaded first.

var acc = document.getElementsByClassName("achieveBoxes");
for (let i=0; i<acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

// Finds the total duration a game has been played depending on the given "Start" and "End Date"
function onloadFunctions() {
  // ---------- Total Duration Functions ---------- //
  // "sliceIntoChunks" list an array of each individual characters in "Start" and "End" Date columns
  function sliceIntoChunks(array, chunkSize) {
    const res = [];
    for (let i=0; i<array.length; i+=chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
  }

  const totalAchieveGames = $(".achieveBoxes").length;
  const dateSingleStringStart = Array.from($(".achieveData:nth-child(2)").text());
  const dateSingleStringEnd = Array.from($(".achieveData:nth-child(3)").text());
  // IMPORTANT! The second parameter (i.e., number) needs to change on both "const" if the format of "Start" and "End" dates changes
  const slicedToGroupStart = sliceIntoChunks(dateSingleStringStart, 10);
  const slicedToGroupEnd = sliceIntoChunks(dateSingleStringEnd, 10);

  // Combines the individual character array we just created to the approriate length
  const datesArrayStart = []
  const datesArrayEnd = []
  for (let i=0; i<totalAchieveGames; i++) {
      const dateFullStringStart = slicedToGroupStart[i].join("");
      datesArrayStart.push(dateFullStringStart);

      const dateFullStringEnd = slicedToGroupEnd[i].join("");
      datesArrayEnd.push(dateFullStringEnd);
   }

  //Calculates the difference in the "datesArrayStart" and "datesArrayEnd"
  const differenceTotal = []
  const startDate = datesArrayStart.map(d => new Date(d));
  const endDate = datesArrayEnd.map(d => new Date(d));
  for (let i=0; i<totalAchieveGames; i++) {
    let differenceInTime = endDate[i].getTime() - startDate[i].getTime();
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);
    if (isNaN(differenceInDays)) {
      differenceTotal.push(" ");
    }
    else if (differenceInDays == 0) {
      differenceTotal.push("> 1 day");
    }
    else if (differenceInDays == 1){
      differenceTotal.push("1 day");
    }
    else {
      differenceTotal.push(differenceInDays + " days");
    }
  } 

  // Inputs the calculated difference in the correct HTML column and row
  const classDuration = document.getElementsByClassName("duration");
  for(let i=0; i<totalAchieveGames; i++) {
	  classDuration[i].innerHTML = differenceTotal[i];
  }

  // ---------- Status Symbol Functions ---------- //
  const gameStatus = new Array(document.getElementsByClassName("completed"), document.getElementsByClassName("aborted"),
    document.getElementsByClassName("standby"),document.getElementsByClassName("ongoing"));
  const completedLength = document.getElementsByClassName("completed").length;
  const abortedLength = document.getElementsByClassName("aborted").length;
  const standbyLength = document.getElementsByClassName("standby").length;
  const ongoingLength = document.getElementsByClassName("ongoing").length;
  
  for (let i=0; i<completedLength; i++) {
    gameStatus[0][i].innerHTML = "<i class=\"fa-solid fa-circle-check\"></i>";
  }
  for (let i=0; i<abortedLength; i++) {
    gameStatus[1][i].innerHTML = "<i class=\"fa-solid fa-circle-xmark\"></i>";
  }
  for (let i=0; i<standbyLength; i++) {
    gameStatus[2][i].innerHTML = "<i class=\"fa-solid fa-circle-pause\"></i>";
  }
  for (let i=0; i<ongoingLength; i++) {
    gameStatus[3][i].innerHTML = "<i class=\"fa-solid fa-circle-play\"></i>";
  }
}