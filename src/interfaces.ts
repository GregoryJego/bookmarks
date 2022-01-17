interface Data {
  type: string,
  html?:string, // Optional
  url: string,
  title: string,
  author_name: string,
  upload_date: string,
  duration: number,
  width: number,
  height: number,
}

interface Video {
  type: string,
  preview?: string, // Optional
  url: string, // used as Id
  title: string,
  author: string,
  addedDateFromNow: number,
  publicationDate: string
  duration: string,
  }
  
interface Photo {
  type: string,
  preview?: string, // Optional
  url: string, // used as Id
  title: string,
  author: string,
  addedDateFromNow: number,
  publicationDate: string
  widthAndHeight: string,
  }
  
  // Bookmark could be a video (Vimeo) or a photo (Flickr)
type Bookmark =
  | Video | Photo
  
export type {
    Photo,
    Video,
    Bookmark,
    Data
  }