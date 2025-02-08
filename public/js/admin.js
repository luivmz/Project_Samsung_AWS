const today = new Date()
    const curHr = today.getHours()

    if (curHr >= 0 && curHr < 12) {
        document.getElementById("demo").innerHTML = 'Buenos días';
    } else if (curHr >= 12 && curHr < 17) {
        document.getElementById("demo").innerHTML = 'Buenas tardes';
    } else {
        document.getElementById("demo").innerHTML = 'Buenas noches';
    }