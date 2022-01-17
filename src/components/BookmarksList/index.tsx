import React, { useEffect } from 'react'
import { Bookmark } from '../../interfaces'
import { BookmarkTile } from '../BookmarkTile'

type Dispatch<A> = (value: A) => void
type SetStateAction<S> = S | ((prevState: S) => S)

interface Props {
    bookmarks: Bookmark[];
    setBookmarks: Dispatch<SetStateAction<Bookmark[]>>;
}

export const BookmarksList: React.FC<Props> = ({ bookmarks, setBookmarks }) => {
    useEffect(() => {
        const interval = setInterval(() => {
            setBookmarks(
                bookmarks.map(bookmark => {
                    return { ...bookmark, addedDateFromNow: bookmark.addedDateFromNow + 1 }
                }),
            )
        }, 60000) // every minute
        return () => clearInterval(interval)
        // only on mount, to avoid to reset setInterval when bookmarks are changing
        //
    }, [bookmarks, setBookmarks])

    const handleDelete = (bookmark: Bookmark) => {
        const newBookmarks = [...bookmarks]
        const index = newBookmarks.indexOf(bookmark)
        if (index > -1) {
            newBookmarks.splice(index, 1)
        }
        setBookmarks(newBookmarks)
        return
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            {bookmarks.map((bookmark, index) => (
                <BookmarkTile
                    key={index}
                    bookmark={bookmark}
                    handleDelete={() => handleDelete(bookmark)}
                />
            ))}
        </div>
    )
}