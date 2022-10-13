/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/*eslint max-lines: ["error", {"max": 500, "skipBlankLines": true}]*/
import {FlickitySlider} from './components/flickitySlider'
import {VideoModal} from './components/videoModal'
import {slidesCreate} from './components/slideCreate'

/* show header subnav on hover */
const navConteudos = [...document.querySelectorAll('.nav-contents')]
const teamCards = [...document.querySelectorAll('.equipe-item')]
const testimonialCards = [...document.querySelectorAll('.depoimentos-item')]
const trilhasCards = [...document.querySelectorAll('.trilhas-item')]

/* MENU Actions */
function openMenu (e) {
  const subNav = e.currentTarget.querySelector('.nav-subnav')
  subNav.classList.remove('is-hidden')
  subNav.style.display = 'block'
  subNav.style.width = 'auto'
  subNav.style.position = 'relative'
  const widthSub = subNav.offsetWidth
  subNav.style.position = 'absolute'
  subNav.style.width = `${widthSub}px`
  subNav.classList.add('is-flex')
}

function hideMenu (e) {
  const subNav = e.currentTarget.querySelector('.nav-subnav')
    subNav.classList.remove('is-flex')
    subNav.classList.add('is-hidden')
}

function toggleMenu (e) {
  const subNav = e.currentTarget.querySelector('.nav-subnav')
  if (subNav.classList.contains('is-hidden')) {
    subNav.classList.remove('is-hidden')
    subNav.classList.add('is-flex')
    subNav.style.position = 'relative'
    subNav.style.width = 'auto'
  } else {
    subNav.classList.add('is-hidden')
    subNav.classList.remove('is-flex')
  }
}

/* Team cards */
function toggleTeamBio (e) {
  teamCards.map(card => {
    if (card === e.currentTarget) return null
    const bio = card.querySelector('.equipe-bio')
    if (bio) bio.classList.remove('show')
  })
  const bioCard = e.currentTarget.querySelector('.equipe-bio')
  if (!bioCard) return
  if (bioCard.classList.contains('show')) {
    bioCard.classList.remove('show')    
  } else {
    bioCard.classList.add('show')    
  }
}
teamCards.map(card => card.addEventListener('click', toggleTeamBio))

/* Testimonials cards */
function toggleTrilhasInfo (e) {  
  trilhasCards.map(card => {
    if (card === e.currentTarget) return null
    const bio = card.querySelector('.trilhas-content')
    if (bio) bio.classList.remove('show')
  })
  const infoCard = e.currentTarget.querySelector('.trilhas-content')
  if (!infoCard) return
  if (infoCard.classList.contains('show')) {    
    infoCard.classList.remove('show')
    infoCard.parentNode.parentNode.style.zIndex = 'inherit'
  } else {
    infoCard.classList.add('show')
    infoCard.parentNode.parentNode.style.zIndex = 10
  }
}
trilhasCards.map(card => card.addEventListener('click', toggleTrilhasInfo))
function defineMenu (isMobile = false) {
  if (!isMobile) {
    document.querySelector('.nav-search-mobile').classList.add('is-hidden')
    document.querySelector('.search-button-mobile').classList.remove('is-hidden')
  }
  const subNavs = [...document.querySelectorAll('.nav-subnav')]
  subNavs.map(sub => sub.classList.add('is-hidden'))

  navConteudos.map(navConteudo => {
    if (!isMobile) {
      navConteudo.removeEventListener('click', toggleMenu)
      navConteudo.addEventListener('mouseenter', openMenu)
      navConteudo.addEventListener('mouseleave', hideMenu)
    } else {
      navConteudo.addEventListener('click', toggleMenu)
      navConteudo.removeEventListener('mouseenter', openMenu)
      navConteudo.removeEventListener('mouseleave', hideMenu)
    }
  })
}
let wSize = window.innerWidth
defineMenu( wSize <= 1215)
window.addEventListener('resize', e => {
  if ((wSize <= 1215 && window.innerWidth > 1215) ||
  (wSize > 1215 && window.innerWidth <= 1215)) {
    wSize = window.innerWidth
    defineMenu(wSize <= 1215)
  }
})

/* toggle mobile menu / search input */
const toggleButton = document.querySelector('#toggleButton')
const navMenu = document.querySelector('.nav-menu')
const searchButton = document.querySelector('.search-button')
const navSearch = document.querySelector('.nav-search')
const inputSearch = document.querySelector('.search-input')
const closeSearch = document.querySelector('.search-close')
const searchButtonMobile = document.querySelector('.search-button-mobile')
const navSearchMobile = document.querySelector('.nav-search-mobile')
const inputSearchMobile = document.querySelector('.search-input-mobile')
const closeSearchMobile = document.querySelector('.nav-search-mobile .search-close')

toggleButton.onclick = () => navMenu.classList.toggle('is-inline-flex')

searchButton.onclick = function () {
  navSearch.classList.remove('is-hidden')
  navSearch.classList.add('is-flex')
  inputSearch.focus()
}

searchButtonMobile.onclick = function () {
  navSearchMobile.classList.add('is-flex')
  navSearchMobile.classList.remove('is-hidden')
  searchButtonMobile.classList.add('is-hidden')
  inputSearchMobile.focus()
}

closeSearch.onclick = () => navSearch.classList.add('is-hidden')
closeSearchMobile.onclick = () => {
  navSearchMobile.classList.add('is-hidden')
  searchButtonMobile.classList.remove('is-hidden')
}

/* manifesto modal */
const videoModal = new VideoModal()

/* hero slider */
const heroSlider = new FlickitySlider(document.querySelectorAll('[data-hero-slider]')[0], 
  [
    {
      max_width: 99999,
      config:{
        groupCells: '80%',
        cellAlign: 'left',
        draggable: true,
        prevNextButtons:false,
        pageDots:true,
        imagesLoaded:true,
        dragThreshold: 10,
        autoPlay: 5000,
      }
    },
    {
      max_width: 1024,
      config:{
        cellAlign: 'left',
        prevNextButtons:false,
        pageDots:true,
        draggable: true,
        imagesLoaded:true,
        autoPlay: 5000,
      }
    },
    
  ]
)

/* services slider */
const servicesSlider = new FlickitySlider(document.querySelectorAll('[data-services-slider]')[0], 
  [
    {
      max_width: 1023,
      config:{
        cellAlign: 'left',
        prevNextButtons:false,
        pageDots:true,
        draggable: true,
        imagesLoaded:true,
      }
    },
  ]
)

/* articles slider */
const articlesSlider = new FlickitySlider(document.querySelectorAll('[data-articles-slider]')[0], 
  [
    {
      max_width: 768,
      config:{
        cellAlign: 'left',
        prevNextButtons:false,
        pageDots:false,
        draggable: true,
        imagesLoaded:true,
      }
    },
  ]
)

/* equipe slider */
const equipeSlider = new FlickitySlider(document.querySelectorAll('[data-equipe-slider]')[0],
  [
    {
      max_width: 99999,
      config: {
        cellAlign: 'left',
        groupCells: '80%',
        prevNextButtons: true,
        pageDots: false,
        imagesLoaded: false,
        contain: true
      }
    },
    {
      max_width: 1024,
      config: {
        cellAlign: 'left',
        prevNextButtons: true,
        pageDots: false
      }
    },
  ]
)

/* equipe slider */
const depoimentosSlider = new FlickitySlider(document.querySelectorAll('[data-depoimentos-slider]')[0],
  [
    {
      max_width: 99999,
      config: {
        cellAlign: 'left',
        groupCells: '80%',
        prevNextButtons: true,
        pageDots: false,
        imagesLoaded: false,
        contain: true
      }
    },
    {
      max_width: 1024,
      config: {
        cellAlign: 'left',
        prevNextButtons: true,
        pageDots: false
      }
    },
  ]
)

/* clientes slider */
const clientesSlider = new FlickitySlider(document.querySelectorAll('[data-clientes-slider]')[0],
  [
    {
      max_width: 99999,
      config: {
        cellAlign: 'left',
        groupCells: '80%',
        prevNextButtons: true,
        pageDots: false,
        imagesLoaded: false,
        freeScroll: true,
        contain: true
      }
    },
    {
      max_width: 1024,
      config: {
        cellAlign: 'left',
        groupCells: '80%',
        prevNextButtons: true,
        pageDots: false,
        imagesLoaded: false,
        freeScroll: true,
        contain: true
      }
    },
  ]
)
slidesCreate()
const btnsExtra = [...document.querySelectorAll('.maxbutton-botao-laranja')]
if (btnsExtra.length > 0) {
  const container = document.querySelector('.page-content')
  const newContainer = document.querySelector('.related-posts')
  if (container && newContainer) {
    btnsExtra.map(btn => {
      container.removeChild(btn)
      newContainer.appendChild(btn)
    })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // going to anchor section
  if(window.location.hash) {
    setTimeout(() => {
      const hash = window.location.hash.replace('#', '')
      const target = document.getElementById(hash)
      const headerOffset = 100
      const elementPosition = target.offsetTop
      const offsetPosition = elementPosition - headerOffset
      window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
      })
      
    }, 500)
  }
})

/**
 * event tracking for GTM
 */

// for email
const gtm_email = document.getElementsByClassName('gtm_email')

for (let i = 0; i < gtm_email.length; i++) {
  gtm_email[i].addEventListener('click', function () {
    const dataLayer = dataLayer || []
    dataLayer.push({
      'event': 'gaEvent',
      'eventCategory': 'Clique',
      'eventAction': 'E-mail',
      'eventLabel': 'Sucesso'
    })
  }, false)
}

// for whatsapp
const gtm_whatsapp = document.getElementsByClassName('gtm_whatsapp')

for (let i = 0; i < gtm_whatsapp.length; i++) {
  gtm_whatsapp[i].addEventListener('click', function () {
    const dataLayer = dataLayer || []
    dataLayer.push({
      'event': 'gaEvent',
      'eventCategory': 'Clique',
      'eventAction': 'WhatsApp',
      'eventLabel': 'Sucesso'
    })
  }, false)
}

// for ebook
const gtm_ebook = document.getElementsByClassName('gtm_ebook')

for (let i = 0; i < gtm_ebook.length; i++) {
  gtm_ebook[i].addEventListener('click', function (e) {
    const label = e.target.parentNode.getAttribute('data-analyticslabel')
    const dataLayer = dataLayer || []
    dataLayer.push({
      'event': 'gaEvent',
      'eventCategory': 'Download',
      'eventAction': 'E-book',
      'eventLabel': label
    })
  }, false)
}
