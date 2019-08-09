(() => {
  let log = (message) => 'FloatPlaneMeta: ' + message

  let fpmFactory = () => {
    class FloatPlaneMeta {
      constructor(){
        this.theaterMode = false
        this.newPadding = '0px'
        this.newMaxWidth = 'none'
        this.newDisplay = 'none'

        this.retrieveElements()
        this.retrieveOriginalStyles()
      }

      toggleTheaterMode() {
        if (this.theaterMode) {
          this.leaveTheaterMode()
        } else {
          this.enterTheaterMode()
        }
      }

      getOriginalStyle(el, style) {
        return el.computedStyleMap().get(style).value + (el.computedStyleMap().get(style).unit || '')
      }

      retrieveElements() {
        this.pageWrapper = document.getElementsByClassName("page-wrapper")[0]
        this.leftNav = document.getElementsByTagName("leftnav")[0]
        this.vidContainer = document
          .getElementsByClassName("video-player-wrapper")[0]
          .getElementsByClassName("video-player-container")[0]
      }

      retrieveOriginalStyles() {
        this.originalPadding = this.getOriginalStyle(this.pageWrapper, 'padding-left')
        this.originalMaxWidth = this.getOriginalStyle(this.vidContainer, 'max-width')
        this.originalDisplay = this.getOriginalStyle(this.leftNav, 'display')
      }

      enterTheaterMode() {
        log('entering theater mode')
        this.pageWrapper.style.paddingLeft = this.newPadding
        this.vidContainer.style.maxWidth = this.newMaxWidth
        this.leftNav.style.display = this.newDisplay
        this.theaterMode = true
      }

      leaveTheaterMode() {
        log('leaving theater mode')
        this.pageWrapper.style.paddingLeft = this.originalPadding
        this.vidContainer.style.maxWidth = this.originalMaxWidth
        this.leftNav.style.display = this.originalDisplay
        this.theaterMode = false
      }
    }

    return new FloatPlaneMeta()
  }

  if (!window.floatPlaneMeta) {
    log('initializing... ⏳')
    window.floatPlaneMeta = fpmFactory()
    log('ready! ✅')
  }

  window.floatPlaneMeta.toggleTheaterMode()
})()
