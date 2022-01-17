import React from 'react'
import {Bookmark} from '../../interfaces'
import {translations} from '../../translations'
import {formatDateAddedFromNow, getKeys} from '../../helpers'

// the `Preview` prop from Bookmark could either be a video iframe (type: video) or an image (type: photo)
// -------------------------------------------------------------------------------------------------------

const Preview = (source:string) => {
  const isIframe = source.includes('iframe')

  const findValueFromKeyInString = (key: string) => {
      return source
          .split(' ')
          .find(function(s) {
              return s.indexOf(key) > -1
          })
          ?.replaceAll('"', '')
          .slice(key.length)
  }

  const src = findValueFromKeyInString('src=')

  if (isIframe)
      return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <iframe frameBorder="0" src={src} width="400px" />
          </div>
      )

  const alt = findValueFromKeyInString('alt=')

  return (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <img alt={alt} src={src} style={{ maxWidth: '200px', objectFit: 'contain' }} />
      </div>
  )
}

// BookmarkTile
// -------------------------------------------------------------------------------------------------------

interface Props {
  bookmark: Bookmark,
  handleDelete: ()=>void, 
}

export const BookmarkTile: React.FC<Props> = ({ bookmark, handleDelete }) => {
  return (
      <div
          style={{
              display: 'flex',
              flexDirection: 'row',
              border: '2px solid #6ACCCB',
              borderRadius: 5,
              width: '800px',
              height: '300px',
              marginTop: 10,
              padding: 10,
          }}
      >
          {/* --------------- Left side: all data, except preview */}
          <div
              style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
              }}
          >
              {getKeys(bookmark).map((bookmarkKey, index) => {
                  return (
                      // ignore preview for the moment
                      bookmarkKey !== 'preview' && (
                          <div key={index}>
                              <span style={{ fontWeight: 'bold' }}>
                                  {translations[bookmarkKey]}&nbsp;:&nbsp;
                                  {/* // url formatting */}
                              </span>
                              {bookmarkKey === 'url' ? (
                                  <a href={bookmark[bookmarkKey]} style={{ color: '#044cd0' }}>
                                      {bookmark[bookmarkKey]}
                                  </a>
                              ) : (
                                  /* // addedDateFromNow formatting */
                                  <>
                                      {bookmarkKey === 'addedDateFromNow'
                                          ? formatDateAddedFromNow(bookmark.addedDateFromNow)
                                          : bookmark[bookmarkKey]}
                                  </>
                              )}
                          </div>
                      )
                  )
              })}
              <div
                  style={{
                      display: 'flex',
                      justifyContent: 'left',
                  }}
              >
                  {/* // delete bookmark button */}
                  <div
                      style={{
                          color: 'white',
                          backgroundColor: '#044cd0',
                          padding: 10,
                          borderRadius: 5,
                          margin: 10,
                          cursor: 'pointer',
                      }}
                      onClick={handleDelete}
                  >
                      {translations.delete}
                  </div>
              </div>
          </div>
          {/* --------------- Right side: preview */}
          {bookmark.preview && Preview(bookmark.preview)}
      </div>
  )
}