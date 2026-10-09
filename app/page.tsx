'use client';
import { useEffect, useState } from 'react';
import vocabulary from '../data/vocabulary.json';
export default function Home() {
 const [index, setIndex] = useState<number | null>(null);
 const [flipped, setFlipped] = useState(false);
 const [bookmarks, setBookmarks] = useState<string[]>([]);
 const [onlySaved, setOnlySaved] = useState(false);
 const [storageWarning, setStorageWarning] = useState(false);
 useEffect(() => {
  try {
   const saved: unknown = JSON.parse(localStorage.getItem('dutch-flip-bookmarks') ?? '[]');
   if (Array.isArray(saved)) setBookmarks([...new Set(saved.filter((word): word is string => typeof word === 'string' && vocabulary.some(card => card.dutch === word)))]);
  } catch { setStorageWarning(true); }
  setIndex(Math.floor(Math.random() * vocabulary.length));
 }, []);
 const pool = vocabulary.map((_, i) => i).filter(i => !onlySaved || bookmarks.includes(vocabulary[i].dutch));
 const card = index === null ? null : vocabulary[index];
 const isSaved = !!card && bookmarks.includes(card.dutch);
 function pick(indices: number[], previous: number | null) {
  const alternatives = indices.filter(i => i !== previous);
  const choices = alternatives.length ? alternatives : indices;
  setIndex(choices.length ? choices[Math.floor(Math.random() * choices.length)] : null);
  setFlipped(false);
 }
 function nextCard() { pick(pool, index); }
 function toggleFilter() {
  const next = !onlySaved;
  setOnlySaved(next);
  const choices = vocabulary.map((_, i) => i).filter(i => !next || bookmarks.includes(vocabulary[i].dutch));
  if (index === null || !choices.includes(index)) pick(choices, null);
  else setFlipped(false);
 }
 function toggleBookmark() {
  if (!card) return;
  const updated = isSaved ? bookmarks.filter(word => word !== card.dutch) : [...bookmarks, card.dutch];
  setBookmarks(updated);
  try { localStorage.setItem('dutch-flip-bookmarks', JSON.stringify(updated)); setStorageWarning(false); }
  catch { setStorageWarning(true); }
  if (onlySaved && isSaved) pick(pool.filter(i => i !== index), index);
 }
 return <div className="shell">
  <header><a className="brand" href="/" aria-label="Dutch Flip home"><span className="logo" aria-hidden="true">✳</span>dutch<span className="light">flip</span><span className="dot">.</span></a><span className="flag" aria-label="Netherlands">🇳🇱</span></header>
  <main><h1 className="sr-only">Dutch vocabulary flashcards</h1>
  <section aria-label="Vocabulary practice"><div className="deck-meta"><span>{onlySaved ? "BOOKMARKED WORDS" : "EVERYDAY WORDS"}</span><span>{pool.length} words</span></div>
  <button className="saved-filter" aria-pressed={onlySaved} onClick={toggleFilter}>★ Bookmarked only <span>{bookmarks.length}</span></button>
  {storageWarning && <p className="storage-warning" role="status">Bookmarks work for this visit, but your browser could not save them.</p>}
  <div className="card-stage">
  {card ? <>
  <button className="bookmark" onClick={toggleBookmark} aria-pressed={isSaved} aria-label={isSaved ? 'Remove bookmark' : 'Bookmark card'} title={isSaved ? 'Remove bookmark' : 'Bookmark card'}>{isSaved ? '★' : '☆'}</button>
  <button className={`flashcard ${flipped ? 'flipped' : ''}`} disabled={!card} onClick={() => setFlipped(!flipped)} aria-pressed={flipped} aria-label={card ? `${flipped ? 'English' : 'Dutch'}: ${flipped ? card.english : card.dutch}. Flip to ${flipped ? 'Dutch' : 'English'}` : 'Loading card'}>
   <span className="card-rotator" key={index}>
    {[false, true].map((back) => <span key={String(back)} className={`card-face ${back ? 'card-back' : 'card-front'}`} aria-hidden={back !== flipped}>
     <span className="card-top"><span className="language">{back ? 'ENGLISH' : 'DUTCH'}</span></span>
     <span className="card-content"><span className="emoji" aria-hidden="true">{card?.emoji ?? '🌷'}</span><span className="word" lang={back ? 'en' : 'nl'}>{card ? (back ? card.english : card.dutch) : 'Even geduld…'}</span><span className="word-note">{back ? 'Now you know a little more.' : 'Do you know this word?'}</span></span>
     <span className="card-bottom"><span aria-hidden="true">↻</span> Tap to {back ? 'see Dutch' : 'reveal translation'}</span>
    </span>)}
   </span>
  </button>
  </> : <div className="empty-state"><span aria-hidden="true">☆</span><h2>{onlySaved ? 'No bookmarks yet' : 'Loading your cards…'}</h2>{onlySaved && <><p>Bookmark a word with the star, then practise it here.</p><button onClick={toggleFilter}>Show all words</button></>}</div>}
  </div>
  <button className="next" disabled={!card} onClick={nextCard}>Next word <span aria-hidden="true">→</span></button><p className="hint">⤨ &nbsp; A fresh shuffle. A new discovery.</p>
  <p className="sr-only" aria-live="polite">{card ? `${flipped ? 'English' : 'Dutch'}: ${flipped ? card.english : card.dutch}` : 'Loading'}</p>
  </section></main><footer>🌷 &nbsp; A small habit that opens a whole new world.</footer>
 </div>;
}
