import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Eğer kullanıcı 300px'den fazla kaydırdıysa butonu göster
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Scroll event'ini dinle
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup: Component kaldırıldığında event listener'ı temizle
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      aria-label="gototop"
      onClick={() =>
        document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
      }
      className={`fixed right-2 bottom-3 md:right-4 md:bottom-4 bg-indigo-600 text-white md:p-3 p-2 rounded-full shadow-lg hover:bg-indigo-800 transition-colors z-50 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
    >
      <i className="pi pi-arrow-up"></i>
    </button>
  );
};

export default ScrollToTopButton;
