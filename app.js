$("#currentDay").text(moment().format('dddd') + ", " + moment().format('MMMM Do'));
var calendarData = [
    { time: "9AM", records: "" },
    { time: "10AM", records: "" },
    { time: "11AM", records: "" },
    { time: "12PM", records: "" },
    { time: "1PM", records: "" },
    { time: "2PM", records: "" },
    { time: "3PM", records: "" },
    { time: "4PM", records: "" },
    { time: "5PM", records: "" }
]

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

    saveBtn.attr("class", "btn btn-primary saveBtn");
    saveBtn.attr("type", "reset");
    saveBtn.attr("value", "save");

    saveBtn.attr("dataTime", calendarData[i].time);
    // console.log(saveBtn.attr("dataTime"))

    $(".container").append(inputGroup);
    inputGroup.append(inputGroupPrepend);
    inputGroupPrepend.append(inputGroupText);
    inputGroup.append(textArea);
    inputGroup.append(saveBtn);
}

$(".btn").on("click", function (e) {
    e.preventDefault();
    // var test = $($(".inputTextArea")[0]).attr("class");
    // var hour = moment().format('hA');
    // console.log(hour.length);
    // console.log(test.split(" ")[2]);
    // console.log(this);
    //Get the time
    console.log($(this).siblings(".input-group-prepend").children(".hour").text());
    //Get the text entered
    console.log($(this).siblings("textarea").val());
    // console.log(moment().format('hA'));
    // console.log(moment(hour, 'hA').isSame('10PM', 'hA'));
    //console.log($($(".inputTextArea")[0]).attr("class")).split("")[2];
})

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


// function isBeforeHours(currentHour, calendarHour) {
//     let currentHourNum = numHour(currentHour);
//     let calendarHourNum = numHour(calendarHour);
//     return currentHourNum < calendarHourNum;
// }

function isAfterHours(currentHour, calendarHour) {
    let currentHourNum = numHour(currentHour);
    let calendarHourNum = numHour(calendarHour);
    return currentHourNum > calendarHourNum;
}

function isSameHours(currentHour, calendarHour) {
    let currentHourNum = numHour(currentHour);
    let calendarHourNum = numHour(calendarHour);
    return currentHourNum === calendarHourNum;
}


function updateTime() {
    let currentHour = moment().format('h A');
    let inputTextArea = $(".inputTextArea");
    let calendarHourStr = $(".hour");
    // console.log($(calendarHourStr[0]).text())
    for (i = 0; i < inputTextArea.length; i++) {
        let calendarHour = $(calendarHourStr[i]).text();
        // console.log(currentHour);
        // console.log(calendarHour);
        if (isSameHours(currentHour, calendarHour)) {
            $(inputTextArea[i]).attr("class", "form-control inputTextArea " + " present");
        } else if (isAfterHours(currentHour, calendarHour)) {
            $(inputTextArea[i]).attr("class", "form-control inputTextArea " + "past");
        } else {
            $(inputTextArea[i]).attr("class", "form-control inputTextArea " + "future");
        }
    }

}
updateTime();
setInterval(updateTime, 1000); // 1000 miliseconds

// function saveInput(thisOne) {
//     // e.preventDefault();
//     console.log(thisOne);
//     console.log($(thisOne).siblings("textarea").val());
// }