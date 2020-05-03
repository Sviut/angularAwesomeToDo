import {Injectable} from '@angular/core'
import * as introJs from 'intro.js'

@Injectable({
  providedIn: 'root'
})
export class IntroService {

  private static INTRO_VIEWED_KEY = 'intro-viewed'
  private static INTRO_VIEWED_VALUE = 'done'


  private introJs = introJs()

  constructor() {
  }


  startIntroJS(checkViewed: boolean) {
    if (checkViewed && localStorage.getItem(IntroService.INTRO_VIEWED_KEY) === IntroService.INTRO_VIEWED_VALUE) {
      return
    }
    this.introJs.setOptions({
      nextLabel: 'след. >',
      prevLabel: '< пред.',
      doneLabel: 'Выход',
      skipLabel: 'Выход',
      exitOnEsc: true,
      exitOnOverlayClick: false
    })

    this.introJs.start()

    this.introJs.onexit(() => localStorage.setItem(IntroService.INTRO_VIEWED_KEY, IntroService.INTRO_VIEWED_VALUE))
  }
}
