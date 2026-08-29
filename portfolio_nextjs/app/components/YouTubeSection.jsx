"use client";

const YoutubeSection = () => {
  return (
    <section className="youtube-section">
      <h2>YouTube Videos</h2>
      <p>
        Can you watch me videos and subscribe to Youtube Channel{" "}
      </p>
      {/* Playlist */}
      <div className="video-wrapper">
        <iframe
          src="https://www.youtube.com/embed/videoseries?list=PLk1vdjqSfYiZzQYK1NnfwAe0Lo6g5Epvf"
          title="Ömer Öztürk YouTube Playlist"
          frameBorder="0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Subscribe CTA */}
      <a
        href="https://www.youtube.com/@omer.ozturk?sub_confirmation=1"
        target="_blank"
        rel="noopener noreferrer"
        className="subscribe-btn"
      >
        🔔 Subscribe to me YouTube
        <i className="fa fa-youtube-square" aria-hidden="true"></i>
      </a>
    </section>
  );
};
export default YoutubeSection;
