import React from 'react';
import Marquee from 'react-fast-marquee';

const sponsors = [
  { name: 'Tata Motors', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/2231px-Tata_logo.svg.png' },
  { name: 'Volvo', img: 'https://images.seeklogo.com/logo-png/15/2/volvo-logo-png_seeklogo-150599.png' },
  { name: 'Ashok Leyland', img: 'https://companieslogo.com/img/orig/ASHOKLEY.NS-ccd24b88.png?t=1744907986' },
  { name: 'OSRTC', img: 'https://osrtc.org/assets/img/cms/osrtc_icon_logo.png' },
  { name: 'Ola', img: 'https://cdn.olaelectric.com/sites/evdp/pages/news_room/press_kit/branding/branding-featured.webp' },
  { name: 'Paytm', img: 'https://www.logo.wine/a/logo/Paytm/Paytm-Logo.wine.svg' },
  { name: 'Uber', img: 'https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png' },
];

const sponsors1 = [
  { name: 'Rapido', img: 'https://animationvisarts.com/wp-content/uploads/2023/10/image-15.png' },
  { name: 'Mercedes', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1200px-Mercedes-Logo.svg.png' },
  { name: 'Eicher', img: 'https://car-logos.b-cdn.net/wp-content/uploads/2023/04/eicher-logo-1948-present-scaled.webp' },
  { name: 'Bus India', img: 'https://play-lh.googleusercontent.com/7vbdoiVbHXt6KqaWr0anuuaclF8l80uuvEaijTRVOrov4Gilvxf81uT9MZPgLooQtZc' },
  { name: 'NHAI', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/National_Highways_Authority_of_India_logo.svg/1200px-National_Highways_Authority_of_India_logo.svg.png' },
  { name: 'Stripe', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1024px-Stripe_Logo%2C_revised_2016.svg.png' },
  { name: 'Uber', img: 'https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png' },
];

const SponsorBox = ({ img, name }: { img: string; name: string }) => (
  <div className="mx-6 flex flex-col items-center justify-center w-40 h-28 bg-white/30 border border-gray-300 backdrop-blur-md rounded-lg p-2 hover:scale-105 transition duration-300 shadow-md">
    <img src={img} alt={name} className="max-h-12 max-w-full object-contain mb-2" />
    <p className="text-sm font-medium text-gray-700 text-center">{name}</p>
  </div>
);

const Sponsors: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Our Sponsors
        </h2>

        <div className="bg-white/60 p-4 rounded-xl shadow-xl border border-gray-300">
          <Marquee pauseOnHover speed={80} gradient={true} gradientWidth={100}>
            {sponsors.map((sponsor, index) => (
              <SponsorBox key={index} img={sponsor.img} name={sponsor.name} />
            ))}
          </Marquee>
        </div>

        <div className="bg-white/60 p-4 rounded-xl shadow-xl border border-gray-300 mt-6">
          <Marquee
            pauseOnHover
            speed={80}
            gradient={true}
            gradientWidth={100}
            direction="right"
          >
            {sponsors1.map((sponsor, index) => (
              <SponsorBox key={index} img={sponsor.img} name={sponsor.name} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
