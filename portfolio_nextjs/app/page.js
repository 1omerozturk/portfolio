"use client"

export default function Home() {

  const goAbout=()=>{
    window.location.href="/about"
  }

  return (
    <div className="min-h-screen bg-gradient-to-tl from-slate-600 to-slate-200">
    <h2>Home</h2>
      <div className="h-1/3 w-1/3 flex float-right">
      <img className="animate-bounce-2 bg-red-500 rounded-full mt-20" src="00.jpg">
      </img>
    </div>
    <button className="btn btn-outline-dark" onClick={goAbout}>Go to About</button>
    </div>
  );
}
