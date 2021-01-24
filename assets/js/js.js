const dropdown = document.querySelector('.dropdown')
const themeSwitch = document.querySelector('.theme-switch')


const createCards = (countries) => {
    const countriesContainer = document.querySelector('.countries')
    const contryCard = document.querySelector('#country-card').content
    const fragment = document.createDocumentFragment();
    for (const country in countries) {
        const cardClone = document.importNode(contryCard, true)
        const countryData = countries[country];
        console.log(countryData);

        cardClone.querySelector('.card__flag').src = countryData.flag
        cardClone.querySelector('.card__country-name').textContent = countryData.population
        cardClone.querySelector('.card__country-name').setAttribute('data-country-code', countryData.alpha)
        cardClone.querySelector('#population').textContent = countryData.population
        cardClone.querySelector('#region').textContent = countryData.region
        cardClone.querySelector('#capital').textContent = countryData.capital
        fragment.appendChild(cardClone)
    }

    countriesContainer.innerHTML = "";
    countriesContainer.append(fragment)

}


const getByRegion = async (region) => {
    if (!region) {
        return
    }

    try {
        const countries = await axios.get(`https://restcountries.eu/rest/v2/region/${region}`)
        // console.log(contrie);
        createCards(countries.data)
    } catch (error) {
        console.log(error)
    }
}

dropdown.addEventListener('click', (e) => {
    e.stopPropagation()
    const target = e.target;

    if (target.classList.contains('dropdown__open-button')
        || target.classList.contains('dropdown__select')
        || target.classList.contains('dropdown__text-content')) {

        dropdown.classList.toggle('dropdown--open')
        return
    }

    if (target.classList.contains('dropdown__item')) {

        document.querySelectorAll('.dropdown__item').forEach(((x) => {
            x.classList.remove('dropdown__item--active')
        }))
        e.target.classList.add('dropdown__item--active')

        const value = e.target.dataset.value
        const text = e.target.textContent
        const select = dropdown.querySelector('.dropdown__text-content')
        select.textContent = text
        select.dataset.value = value

        dropdown.classList.toggle('dropdown--open')

        getByRegion(value)
    }

})

themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    document.querySelector('.main-nav__input-country').focus()
})

addEventListener('click', (e) => {
    if (dropdown.classList.contains('dropdown--open')) {
        dropdown.classList.remove('dropdown--open')
    }
})

addEventListener('DOMContentLoaded', async (e) => {

})