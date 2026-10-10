"use client";

import { useState } from "react";
import { FaPlay, FaYoutube } from "react-icons/fa";

const YoutubeSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="youtube-section" aria-labelledby="youtube-title">
      <h2 id="youtube-title">YouTube videolarım</h2>
      <p>Videolarıma göz atabilir ve kanalıma abone olabilirsiniz.</p>
      <div className="video-wrapper">
        {isPlaying ? (
          <iframe
            src="https://www.youtube-nocookie.com/embed/videoseries?list=PLk1vdjqSfYiZzQYK1NnfwAe0Lo6g5Epvf&autoplay=1"
            title="Ömer Öztürk YouTube playlist"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button className="youtube-preview" type="button" onClick={() => setIsPlaying(true)}>
            <span className="youtube-preview__play"><FaPlay aria-hidden="true" /></span>
            <span>Oynatma listesini aç</span>
          </button>
        )}
      </div>

      <a
        href="https://www.youtube.com/@omer.ozturk?sub_confirmation=1"
        target="_blank"
        rel="noopener noreferrer"
        className="subscribe-btn"
      >
        <FaYoutube aria-hidden="true" /> YouTube kanalıma abone ol
      </a>
    </section>
  );
};
export default YoutubeSection;
