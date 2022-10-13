import Flickity from 'flickity'

export class FlickitySlider {
  constructor (target, queries) {
    if (!target) return
    this.target = target
    this.queries = queries
    this.conf = null
    this.flick = null
    this.resT = null
    this.callbacks = []
    window.addEventListener('resize', this.onResize.bind(this))
    this.onResize()
  }

  onResize () {
    this.resT && clearTimeout(this.resT)
    this.resT = setTimeout( this.renderCheck.bind(this), 100)
  }

  renderCheck () {
    let c = null
    this.queries.map((q) => {
      c = window.innerWidth <= q.max_width ? q.config : c 
    })

    this.conf = c
    setTimeout(this.renderFlickity.bind(this), 100)
  }

  flickRender (callback) {
    this.callbacks.push(callback)
  }

  renderFlickity () {
    if(this.conf && !this.flick) {
      this.flick = new Flickity(this.target, this.conf)
      this.callbacks.forEach(callback => callback(this.flick))
    }
    else if(this.conf && this.flick) {
      this.flick.destroy()
      this.callbacks = []
      this.flick = new Flickity(this.target, this.conf)
      this.callbacks.forEach(callback => callback(this.flick))
    }else if(this.flick) {
      this.flick.destroy()
      this.callbacks = []
    }
  }
}
