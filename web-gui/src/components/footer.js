function Footer() {
  return (
    <div className="container mx-auto px-3 mb-20">
      <div className="max-w-xl text-sm mx-auto text-center text-slate-700">
        <hr className="mb-8" />
        <div className="font-bold mb-2">About</div>
        <div className="mb-1">There's more high quality journalism than we think. Way too often it's too hard to find. That's why I'm developing the Open Recommendation Butler.</div>
        <div className="mb-8">Tech progress enables the media industry to flourish. Let's make journalism thrive instead of survive <span className="text-slate-600">♥</span></div>
        <div className="font-bold mb-2">Responsible</div>
        <div className="mb-1">
          Matthias Meyer<br />
          Koloniestr. 6b<br />
          13357 Berlin
        </div>
        <div className="mb-8">
          hallo@cluster.today
        </div>
        <div className="font-bold mb-4">Kindly funded and supported by</div>
        <a href="https://www.media-lab.de/de/media-tech-lab" target="_blank">
          <img className="mx-auto w-20" src={process.env.PUBLIC_URL + '/ML_Logo.webp'} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
