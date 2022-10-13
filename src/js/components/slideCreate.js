import {FlickitySlider} from './flickitySlider'

/** trilhas slider */
const sliderSettings = [
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
      max_width: 767,
      config:{
        cellAlign: 'left',
        groupCells: '100%',
        prevNextButtons:false,
        pageDots:true,
        draggable: true,
        imagesLoaded:true,
        contain: false,
      }
    },
  ]


export function slidesCreate () {
    const trilhaSliders = [...document.querySelectorAll('[data-trilhas-slider]')]
    trilhaSliders.map(trilha => new FlickitySlider(trilha, sliderSettings))

    function hideArrows () {
      trilhaSliders.map(trilha => {
        if (trilha.querySelectorAll('.trilhas-item').length <= 3) {
          setTimeout(() => {
            const btnTrilha = [...trilha.querySelectorAll('.flickity-button')]
            btnTrilha.map(btn => {
              btn.style.display = 'none'
              return null
            })
          }, 500)
        }
      })
      
    }

    window.addEventListener('resize', hideArrows)
    hideArrows()
}
