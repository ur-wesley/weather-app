const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

messageOne.textContent = 'Gib einen Ort ein um das Wetter angezeigt zu bekommen.'
messageTwo.textContent = 'Hier könnte ihre Werbung stehen.'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = 'Hier könnte ihre Werbung stehen.'

    fetch('/weather?location=' + location).then((respone) => {
        respone.json().then(({ error, forecast, location } = {}) => {
            if (error) {
                messageOne.textContent = 'error'
                messageTwo.textContent = error
                return console.log(error)
            }
            console.log(location + '\n' + forecast)
            messageOne.textContent = location
            messageTwo.textContent = forecast
        })
    })
})