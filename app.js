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
    //$(".container").append('<div class="input-group"><div class="input-group-prepend"><span class="input-group-text"></span></div><textarea class="form-control" aria-label="With textarea"></textarea><input class="btn btn-primary" type="reset" value="Save"></div>');
    let inputGroup = $('<div class= "input-group row"></div>');
    let inputGroupPrepend = $('<div></div>');
    let inputGroupText = $("<span></span>");
    let textArea = $("<textarea></textarea>");
    let saveBtn = $("<input></input>");

    inputGroupPrepend.attr("class", "input-group-prepend");
    inputGroupText.attr("class", "input-group-text hour");
    inputGroupText.text(calendarData[i].time);

    textArea.attr("class", "form-control");
    textArea.attr("aria-label", "With textarea");

    saveBtn.attr("class", "btn btn-primary saveBtn");
    saveBtn.attr("type", "reset");
    saveBtn.attr("value", "save");

    saveBtn.attr("datatime", calendarData[i].time);
    console.log(saveBtn.attr("datatime"))

    $(".container").append(inputGroup);
    inputGroup.append(inputGroupPrepend);
    inputGroupPrepend.append(inputGroupText);
    inputGroup.append(textArea);
    inputGroup.append(saveBtn);
}

$(".btn").on("click", function () {
    console.log(this)
    console.log(this.datatime);
})