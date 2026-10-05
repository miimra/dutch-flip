'use client';
import { useEffect, useState } from 'react';
import vocabulary from '../data/vocabulary.json';
export default function Home() {
 const [index, setIndex] = useState<number | null>(null);
 const [flipped, setFlipped] = useState(false);
 useEffect(() => { setIndex(Math.floor(Math.random() * vocabulary.length)); }, []);
 const card = index === null ? null : vocabulary[index];
 function nextCard() {
  if (index === null) return;
  // Uniform selection among all other cards prevents immediate repeats.
  const offset = 1 + Math.floor(Math.random() * (vocabulary.length - 1));
  setIndex(vocabulary.length > 1 ? (index + offset) % vocabulary.length : 0);
  setFlipped(false);
 }
 return <div className="shell">
  <header><a className="brand" href="/" aria-label="Dutch Flip home"><span className="logo" aria-hidden="true">✳</span>dutch<span className="light">flip</span><span className="dot">.</span></a><span className="flag" aria-label="Netherlands">🇳🇱</span></header>
  <main><h1 className="sr-only">Dutch vocabulary flashcards</h1>
  <section aria-label="Vocabulary practice"><div className="deck-meta"><span>EVERYDAY WORDS</span><span>{vocabulary.length} words ↗</span></div>
  <button className={`flashcard ${flipped ? 'flipped' : ''}`} disabled={!card} onClick={() => setFlipped(!flipped)} aria-pressed={flipped} aria-label={card ? `${flipped ? 'English' : 'Dutch'}: ${flipped ? card.english : card.dutch}. Flip to ${flipped ? 'Dutch' : 'English'}` : 'Loading card'}>
   <span className="card-rotator" key={index}>
    {[false, true].map((back) => <span key={String(back)} className={`card-face ${back ? 'card-back' : 'card-front'}`} aria-hidden={back !== flipped}>
     <span className="card-top"><span className="language">{back ? 'ENGLISH' : 'DUTCH'}</span><span className="star" aria-hidden="true">✧</span></span>
     <span className="card-content"><span className="emoji" aria-hidden="true">{card?.emoji ?? '🌷'}</span><span className="word" lang={back ? 'en' : 'nl'}>{card ? (back ? card.english : card.dutch) : 'Even geduld…'}</span><span className="word-note">{back ? 'Now you know a little more.' : 'Do you know this word?'}</span></span>
     <span className="card-bottom"><span aria-hidden="true">↻</span> Tap to {back ? 'see Dutch' : 'reveal translation'}</span>
    </span>)}
   </span>
  </button>
  <button className="next" disabled={!card} onClick={nextCard}>Next word <span aria-hidden="true">→</span></button><p className="hint">⤨ &nbsp; A fresh shuffle. A new discovery.</p>
  <p className="sr-only" aria-live="polite">{card ? `${flipped ? 'English' : 'Dutch'}: ${flipped ? card.english : card.dutch}` : 'Loading'}</p>
  </section></main><footer>🌷 &nbsp; A small habit that opens a whole new world.</footer>
 </div>;
}
