import {translations} from '../translations'
import {Data} from '../interfaces'

export const formatDuration = (durationInSecs:number) => {
    // duration in seconds  
    if (!durationInSecs || durationInSecs === 0) return "00:00:00"
      const hours   = Math.floor(durationInSecs / 3600)
      const minutes = Math.floor((durationInSecs - (hours * 3600)) / 60)
      const seconds = durationInSecs - (hours * 3600) - (minutes * 60)  
      let hoursStr = hours.toString()
      let minutesStr = minutes.toString()
      let secondsStr = seconds.toString()
      if (hours   < 10) {hoursStr   = "0" + hours}
      if (minutes < 10) {minutesStr = "0" + minutes}
      if (seconds < 10) {secondsStr = "0" + seconds}
      return hoursStr + ":" + minutesStr + ":" + secondsStr
    }

export const formatDateAddedFromNow = (durationInMin:number) => {
        // duration in minutes    
        const hours   = Math.floor(durationInMin / 60)
        const minutes = durationInMin - (hours * 60)  

        return translations.ago + (hours > 0 ? hours + ' ' + translations.hours + ' ' : '') + minutes + ' ' + translations.minutes
    }

export const isValidUrl = (str: string) => {
        let url
        try {
          url = new URL(str)
        } catch (_) {
          return false
        }
        return url.protocol === "http:" || url.protocol === "https:"
    }

export const createNewBookmark = (data:Data) => {

      const bookmark = {
        type: data.type,
        preview:data.html,
        title: data.title,
        author: data.author_name,
        url: data.url, // used as Id
        addedDateFromNow: 0,
        publicationDate: !data.upload_date ? translations.unknown : new Date(data.upload_date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        }
  
        let bookmarkWithAddedData
  
        // We've checked before that the type is 'video' or 'photo'
        // Add duration for video
        if (data.type === 'video'){
          bookmarkWithAddedData = {...bookmark, duration: formatDuration(data.duration) }
        }
        // Add widthAndHeight for photo
        else {
          bookmarkWithAddedData = {...bookmark, widthAndHeight: `${data.width} x ${data.height}` }
        }
  
  
        return bookmarkWithAddedData
  }

  export const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>
