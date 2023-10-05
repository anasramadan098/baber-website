const langSelector = document.querySelector('.langSelector');
let langSelectorPrevValue = langSelector.value

langSelector.addEventListener('change',() => {
    if (langSelector.value != langSelectorPrevValue) {
        
        location.href = '/' + langSelector.value
    }
})

window.onscroll = function() {
    if (scrollY >= 80) {
        document.querySelector('header').classList.add('scrolled')
    } else {
        document.querySelector('header').classList.remove('scrolled')
    }
}