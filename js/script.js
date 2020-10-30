
function initializeCalendar() {
    var calendarData;

    //Set today's date on the top of the calendar
    $("#currentDay").text(moment().format('dddd') + ", " + moment().format('MMMM Do'));

    //Initialize the data that is stored in local storage and set calendarData to it.  If there is no data, create initial data. 
    if (JSON.parse(localStorage.getItem("calendarData")) === null) {
        console.log("here")
        calendarData = [
            { time: "9AM", records: "" },
            { time: "10AM", records: "" },
            { time: "11AM", records: "" },
            { time: "12PM", records: "" },
            { time: "1PM", records: "" },
            { time: "2PM", records: "" },
            { time: "3PM", records: "" },
            { time: "4PM", records: "" },
            { time: "5PM", records: "" },
        ]
        localStorage.setItem("calendarData", JSON.stringify(calendarData));
    } else {
        calendarData = JSON.parse(localStorage.getItem("calendarData"));
        console.log("there")
    }

    //Loop through the DOM to construct the calendar
    for (i = 0; i < 9; i++) {
        let inputGroup = $('<div class= "input-group row"></div>');
        let inputGroupPrepend = $('<div></div>');
        let inputGroupText = $("<span></span>");
        let textArea = $("<textarea></textarea>");
        let saveBtn = $("<input></input>");

        inputGroupPrepend.attr("class", "input-group-prepend");
        inputGroupText.attr("class", "input-group-text hour");
        inputGroupText.text(calendarData[i].time);

        textArea.attr("class", "form-control inputTextArea " + calendarData[i].time);
        textArea.attr("aria-label", "With textarea");
        textArea.text(calendarData[i].records);

        saveBtn.attr("class", "btn btn-primary saveBtn");
        saveBtn.attr("type", "reset");
        saveBtn.attr("value", "Save");

        saveBtn.attr("dataTime", calendarData[i].time);

        $(".container").append(inputGroup);
        inputGroup.append(inputGroupPrepend);
        inputGroupPrepend.append(inputGroupText);
        inputGroup.append(textArea);
        inputGroup.append(saveBtn);
    }
}

//Converts the format HHA (ex. 12PM) into a numerical number for comparison
function numHour(hour) {
    let num;
    if (hour.length === 3) {
        num = parseInt(hour[0]);
    } else {
        num = parseInt(hour[0] + hour[1]);
    }

    if ((hour[hour.length - 2] === "P") && (num != 12)) {
        num = num + 12;
    }

    return num;
}

//Takes in currentHour and calendarHour in the format HHA (ex. 12PM) 
//and return true if currentHourNum > calendarHourNum
function isAfterHours(currentHour, calendarHour) {
    let currentHourNum = numHour(currentHour);
    let calendarHourNum = numHour(calendarHour);
    return currentHourNum > calendarHourNum;
}

//Takes in currentHour and calendarHour in the format HHA (ex. 12PM) 
//and return true if currentHourNum = calendarHourNum
function isSameHours(currentHour, calendarHour) {
    let currentHourNum = numHour(currentHour);
    let calendarHourNum = numHour(calendarHour);
    return currentHourNum === calendarHourNum;
}

//Sets the color such that each section color reflects whether it is present, past or future
function updateTime() {
    let currentHour = moment().format('h A');
    let inputTextArea = $(".inputTextArea");
    let calendarHourStr = $(".hour");
    for (i = 0; i < inputTextArea.length; i++) {
        let calendarHour = $(calendarHourStr[i]).text();
        if (isSameHours(currentHour, calendarHour)) {
            $(inputTextArea[i]).attr("class", "form-control inputTextArea " + " present");
        } else if (isAfterHours(currentHour, calendarHour)) {
            $(inputTextArea[i]).attr("class", "form-control inputTextArea " + "past");
        } else {
            $(inputTextArea[i]).attr("class", "form-control inputTextArea " + "future");
        }
    }

}

initializeCalendar();
updateTime();
setInterval(updateTime, 1000); // Check the color of each section every 1000 millisecond

//If any time the save button is clicked, save the information into Local Storage
$(".btn").on("click", function (e) {
    e.preventDefault();
    var entryTime = $(this).siblings(".input-group-prepend").children(".hour").text();
    var entryText = $(this).siblings("textarea").val();
    var calendarData = JSON.parse(localStorage.getItem("calendarData"));

    for (i = 0; i < calendarData.length; i++) {
        if (entryTime === calendarData[i].time) {
            calendarData[i].records = entryText;
        }
        localStorage.setItem("calendarData", JSON.stringify(calendarData));
    }

})