import React from 'react';
import { motion } from 'framer-motion';

const images = [
  'https://master.osrtc.org/mdbapi/UploadDocument/UploadWebPortalMaster/Images/Passenger%20boarding%20at%20depot.webp',
  'https://imagedelivery.net/dmcxpiIQ1lAgOmi_eg0IzQ/c05d1c5c-0705-446f-1bed-a85a5768a300/public',
  'https://osrtc.org/assets/img/gallery_images/9.webp',
  'https://www.financialexpress.com/wp-content/uploads/2024/01/Jammu-Smart-City-drivers-towards-a-greener-tomorrow-with-Tata-Motors-electric-buses-1.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxJYE-BogcyL7eWPJwCCIW44JzgafuMg1wcQ&s'
];

const HomeSec3: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-100 via-blue-100 to-green-100">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          Experience the Ride
        </h2>

        {/* Box container */}
        <div className="w-full rounded-xl shadow-2xl overflow-hidden relative" style={{ height: 400 }}>
          {/* Sliding images motion container */}
          <motion.div
            className="flex w-[200%] h-full"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: 'linear',
            }}
          >
            {[...images, ...images].map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 h-full"
                style={{
                  width: `${100 / images.length}%`,
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeSec3;
