import React, {useState} from 'react'
import {Bookmark} from '../../interfaces'
import {translations} from '../../translations'
import {apiURL} from '../../env'
import {createNewBookmark, isValidUrl} from '../../helpers'

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

interface Props {
    bookmarks: Bookmark[],
    setBookmarks: Dispatch<SetStateAction<Bookmark[]>>, 
}

export const AddForm: React.FC<Props> = ({bookmarks, setBookmarks}) => {
  const [url, setUrl] = useState('')
  const handleSubmit = (e: React.SyntheticEvent) => {
      e.preventDefault()
      if (isValidUrl(url)) {
          fetch(`${apiURL}${url}`)
              .then(function(response) {
                  if (response.ok) {
                      // OK
                      return response.json()
                  } else {
                      // KO
                      alert(translations.responseKO)
                  }
              })
              .catch(function(error) {
                  // Error
                  alert(translations.errorOccured + `"${error.message}"`)
              })
              .then(function(jsonData) {
                  // Check if type is video or photo
                  if (jsonData.type !== 'video' && jsonData.type !== 'photo') {
                      alert(translations.errorOccured + `"${jsonData.error}"`)
                      return
                  }
                  // Check if url has not already be included in bookmarks
                  if (bookmarks.find(bookmark => bookmark.url === jsonData.url)) {
                      alert(translations.alreadyInBookmarks)
                      return
                  }
                  const newBookmark = createNewBookmark(jsonData)
                  setBookmarks([...bookmarks, newBookmark])
                  return
              })
      } else {
          alert(translations.invalidUrl)
      }
  }

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as typeof
          e.target &
          {
              value: string,
          }
      setUrl(target.value)
  }

  return (
      <div
          style={{
              backgroundColor: '#6ACCCB',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
          }}
      >
          <form onSubmit={handleSubmit}>
              <input
                  name="url"
                  placeholder={translations.enterUrl}
                  style={{ backgroundColor: 'white', width: 300, padding: 10 }}
                  type="text"
                  value={url}
                  onChange={handleChange}
              />
              <input
                  style={{
                      backgroundColor: url ? '#044cd0' : '#7a8793',
                      color: 'white',
                      padding: '10px',
                      borderRadius: '5px',
                      margin: '10px',
                      cursor: 'pointer',
                  }}
                  type="submit"
                  value={translations.send}
              />
          </form>
      </div>
  )
}