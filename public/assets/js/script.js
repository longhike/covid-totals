$(document).ready(function () {
    const deaths = document.getElementById('deaths')
    const cases = document.getElementById('cases')
    const recovered = document.getElementById('recovered')
    const lastUpdated = document.getElementById('last-updated')
    const monthInput = document.getElementById('month')
    const dayInput = document.getElementById('day')
    const submit = document.getElementById('submit')
    const clear = document.getElementById('clear')
    const resultsHolder = document.getElementById('results-card')
    const warn = document.getElementById('warn')

    let date
    let month
    let day


    submit.addEventListener('click', (e) => {
        e.preventDefault()
        resultsHolder.style.display = 'none'
        clearDate()
        getMonthAndDay()
        validateDate(month, day)
        runRequest()
    })

    clear.addEventListener('click', (e) => {
        e.preventDefault()
        resultsHolder.style.display = 'none'
    })


    // ***************** FUNCTIONS *****************
    // handles total request/response
    function runRequest() {
        if (warn.innerText !== '') {
            return
        };
        fetch("/api/covid?date=" + date)
            .then(res => res.json())
            .then((res) => {
                if (res.date === undefined) {
                    clearDivs()
                    warn.innerText = 'This is not a valid entry. Please use a valid month and date.'
                } else {
                    clearDivs()
                    cases.innerHTML = `<strong>Confirmed Cases: </strong> ${res.confirmed.toLocaleString()}`
                    deaths.innerHTML = `<strong>Deaths: </strong> ${res.deaths.toLocaleString()}`
                    recovered.innerHTML = `<strong>Recovered Cases: </strong> ${res.recovered.toLocaleString()}`
                    lastUpdated.innerHTML = `<strong>As of: </strong> ${res.date}`
                    resultsHolder.style.display = 'block'
                }
      
            })
            .catch(err => console.log(err))
    }

    // handle input validation for string property (not string value)
    function validateDate(month, day) {
        let zero = '0'
        warn.innerText = ''
        if (month.length > 2 || day.length > 2 || month === NaN || day === NaN) {
            warn.innerText = "Please format numbers correctly (2 or 22, for example)"
            return
        }
        else if (month.length < 2 && day.length < 2) {
            month = zero.concat(month)
            day = zero.concat(day)
            date = '2020-' + month + "-" + day
        }
        else if (month.length < 2) {
            month = zero.concat(month)
            date = '2020-' + month + "-" + day
        }
        else if (day.length < 2) {
            day = zero.concat(day)
            date = '2020-' + month + "-" + day
        }
        else {
            date = '2020-' + month + "-" + day
        }

    }
    // formats inputs for month and day (to number then to string)
    function getMonthAndDay() {
        month = parseInt(monthInput.value)
        month = month.toString()
        day = parseInt(dayInput.value)
        day = day.toString()
    }
    // clears the input and results 
    function clearDivs() {
        monthInput.value = ''
        dayInput.value = ''
        warn.innerText = ''
        deaths.innerHTML = ''
        recovered.innerHTML = ''
        cases.innerHTML = ''
        lastUpdated.innerHTML = ''

    }
    // sets "date" global var to empty
    function clearDate() {
        date = ''
    }

})



