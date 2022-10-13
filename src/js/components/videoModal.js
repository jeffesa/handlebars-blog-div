export class VideoModal {
  constructor (manifesto) {
    this.video = document.getElementsByClassName('video-container')[0]
    this.links = Array.from(document.querySelectorAll('.video-modal'))
    this.play_icon = Array.from(document.querySelectorAll('.play-icon'))
    // to open modal
    
    if (this.links.length === 0) {
      return
    }
    this.links.map((el) => {
      el.addEventListener('click', this.toggleModal.bind(this))
    })
    this.play_icon.map((el) => {
      el.addEventListener('click', this.toggleModal.bind(this))
    })
    // to close modal
    this.video.addEventListener('click', this.displayModal.bind(this))
  }

  // display modal
  displayModal (urlVideo = null, videoCard = null) {
    // variables
    const html = document.getElementsByTagName('html')[0]
    const body = document.getElementsByTagName('body')[0]
    const video = document.getElementsByClassName('video-container')[0]
    const top = window.pageYOffset || document.documentElement.scrollTop
    
    // disable/enable scrolling   
    if(html.getAttribute('style') === null || html.getAttribute('style') === '') {
      // set video src
      urlVideo !== '' ? video.getElementsByTagName('iframe')[0].setAttribute('src', urlVideo) : ''
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
      // show video
      video.classList.remove('is-hidden-desktop', 'is-hidden-touch')
      // to open in the current top position
      video.style.top = top + 'px'
    } else {
      html.style.removeProperty('overflow')
      body.style.removeProperty('overflow')
      // hide video
      video.classList.add('is-hidden-desktop', 'is-hidden-touch')
      video.getElementsByTagName('iframe')[0].setAttribute('src', '')
    }
  }

  toggleModal (e) {
    // video-card element
    const urlVideo = e.composedPath()[3].querySelectorAll('.video-modal')[0].getAttribute('data-video')
    //
    this.displayModal(urlVideo)
  }
}
