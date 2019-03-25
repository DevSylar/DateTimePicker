const logDatePicker = {}
let aux = null
const headWeek = `<tr id="week">
                    <th>Dom</th>
                    <th>Lun</th>
                    <th>Mar</th>
                    <th>Mie</th>
                    <th>Jue</th>
                    <th>Vie</th>
                    <th>Sab</th>
                    </tr>`
const arrayMonth = ["Enero", "Febrero", "Marzo", "Abril", "mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
function startDateTimePicker(id) {
    logDatePicker[id] = new Date()
    document.getElementById(id).onclick = function () {
        let datePicker = logDatePicker[id]
        document.getElementById("TitlePicker").innerText = document.getElementById(id).dataset.title
        showDataPicker(id, datePicker)
        document.getElementById("backMonth").onclick = function () {
            logDatePicker[id].setMonth(logDatePicker[id].getMonth() - 1)
            document.getElementById(id).click()
        }

        document.getElementById("nextMonth").onclick = function () {
            logDatePicker[id].setMonth(logDatePicker[id].getMonth() + 1)
            document.getElementById(id).click()
        }

        document.getElementById("month").onclick = function () {
            document.getElementById("monthSelect").style.display = "block"
        }
        document.getElementById("OK_btn").onclick = function () {
            let d = logDatePicker[id]
            let hours = d.getHours()
            let m = d.getMonth() + 1
            let di = d.getDate()
            let mi = d.getMinutes()
            if (hours > 11)
                hours = hours - 12
            if (hours < 10)
                hours = "0" + hours
            if (hours == 0)
                hours = 12
            if (m < 10)
                m = "0" + m
            if (di < 10)
                di = "0" + di
            if (mi < 10)
                mi = "0" + mi
            let date = `${di}/${m}/${d.getFullYear()} ${hours}:${mi} ${document.getElementById("tm").innerText}`
            document.getElementById(id).value = date
            document.getElementById("ModalPicker").style.display = "none"
        }

        document.getElementById("hours").onchange = function () {
            let value = this.value
            logDatePicker[id].setHours(value)
            let time = "AM"
            if (value > 11) {
                value = value - 12
                time = "PM"
            }
            if (value < 10)
                value = "0" + value
            if (value == 0)
                value = 12
            document.getElementById("tm").innerText = " " + time
            document.getElementById("hour_detail").innerText = value
        }

        document.getElementById("minutes").onchange = function () {
            let value = this.value
            logDatePicker[id].setMinutes(value)
            if (value < 10)
                value = "0" + value
            document.getElementById("minute_detail").innerText = value
        }
        createMonthList(id)
    }
}

function createMonthList(id) {
    let html = `<table id="tableMonths">`
    let cut = 3;
    html += "<tr>"
    for (let i = 0; i < arrayMonth.length; i++) {
        if (i % cut == 0 && i != 0) {
            html += `</tr><tr>`
        }
        html += `<td align="center" onclick="onclickMonth('${id}',${i})">${arrayMonth[i]}</td>`
    }
    html += "</tr></table>"

    document.getElementById("monthSelect").innerHTML = html
}

function showDataPicker(id, date) {
    document.getElementById("ModalPicker").style.display = "flex"
    document.getElementById("year").value = date.getFullYear()
    document.getElementById("month").value = arrayMonth[date.getMonth()]
    let arrayDatesMonth = getDaysInMonth(date.getMonth(), date.getFullYear())
    let html = headWeek
    const rowCalendar = 6
    const daysWeek = 7
    const startMonth = arrayDatesMonth[0].getDay()
    let indexArray = 0
    let startPrint = false
    for (let i = 0; i < rowCalendar; i++) {
        html += "<tr class='rowDays'>"
        for (let j = 0; j < daysWeek; j++) {
            if (i == 0 && j == startMonth) {
                startPrint = true
            }
            if (startPrint) {
                let day = arrayDatesMonth[indexArray]
                html += `<td class="day" align="center" onclick="onclickPicker('${id}','${day.toString()}',this)">${day.getDate()}</td>`
                indexArray++
                if (arrayDatesMonth.length <= indexArray) {
                    startPrint = false
                }
            }
            else {
                html += "<td></td>"
            }
        }
        html += "</tr>"
    }
    document.getElementById("tableMonth").innerHTML = html
}

function onclickPicker(id, date, _this) {
    let dateSelect = new Date(date)
    logDatePicker[id].setMonth(dateSelect.getMonth())
    logDatePicker[id].setYear(dateSelect.getFullYear())
    logDatePicker[id].setDate(dateSelect.getDate())
    _this.style.background = "#1E90FF"
    _this.style.color = "white"
    if(aux != null && aux != _this){
        aux.style.background = "white"
        aux.style.color = "rgba(30,30,30,1)"
    }
        
    aux = _this
}

function onclickMonth(id, month) {
    logDatePicker[id].setMonth(month)
    document.getElementById("monthSelect").style.display = "none"
    document.getElementById(id).click()
}

//Referencia del fragmento codigo http://jsfiddle.net/kKj8h/1/
function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}