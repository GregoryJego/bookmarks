import React, {useState} from 'react';
import './App.css';
import {AddForm} from './components/AddForm'
import {BookmarksList} from './components/BookmarksList'
import {Bookmark} from './interfaces'

const App: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  return (
    <div className="App">
      <AddForm bookmarks={bookmarks} setBookmarks={setBookmarks}/>
      <BookmarksList bookmarks={bookmarks} setBookmarks={setBookmarks}/>
    </div>
  );
}

export default App;
