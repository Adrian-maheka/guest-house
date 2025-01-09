"use client";

import { useState } from 'react';

export default function Home() {
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    numGuests: 1,
    roomNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(10, parseInt(e.target.value, 10))); // Ensure the value is between 1 and 10
    setBookingDetails({ ...bookingDetails, numGuests: value });
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBookingDetails({ ...bookingDetails, roomNumber: e.target.value });
  };

  const roomDetails = [
    { type: 'Room 1', price: 'Rp.400k/night', availability: 'Available', facilities: ['AC', 'TV', 'Wi-Fi', 'Workspace', 'Parking', 'Swimming Pool', 'Small Kitchen', 'Hot Shower', 'Breakfast on Request', 'Balcony and Garden'] },
    { type: 'Room 2', price: 'Rp.400k/night', availability: 'Available', facilities: ['AC', 'TV', 'Wi-Fi', 'Workspace', 'Parking', 'Swimming Pool', 'Small Kitchen', 'Hot Shower', 'Breakfast on Request', 'Balcony and Garden'] },
    { type: 'Room 3', price: 'Rp.400k/night', availability: 'Available', facilities: ['AC', 'TV', 'Wi-Fi', 'Workspace', 'Parking', 'Swimming Pool', 'Small Kitchen', 'Hot Shower', 'Breakfast on Request', 'Balcony and Garden'] },
    { type: 'Room 4', price: 'Rp.400k/night', availability: 'Available', facilities: ['AC', 'TV', 'Wi-Fi', 'Workspace', 'Parking', 'Swimming Pool', 'Small Kitchen', 'Hot Shower', 'Breakfast on Request', 'Balcony and Garden'] },
    { type: 'Room 5', price: 'Rp.400k/night', availability: 'Available', facilities: ['AC', 'TV', 'Wi-Fi', 'Workspace', 'Parking', 'Swimming Pool', 'Small Kitchen', 'Hot Shower', 'Breakfast on Request', 'Balcony and Garden'] },
    { type: 'Room 6', price: 'Rp.400k/night', availability: 'Available', facilities: ['AC', 'TV', 'Wi-Fi', 'Workspace', 'Parking', 'Swimming Pool', 'Small Kitchen', 'Hot Shower', 'Breakfast on Request', 'Balcony and Garden'] },
  ];

  const filteredRooms = roomDetails.filter(room => {
    if (filterAvailability === 'available') return room.availability === 'Available';
    if (filterAvailability === 'unavailable') return room.availability === 'Unavailable';
    return true;
  });

  const handleBookingSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Validasi form
    if (!bookingDetails.name || !bookingDetails.phone || !bookingDetails.email || !bookingDetails.checkIn || !bookingDetails.checkOut || !bookingDetails.numGuests || !bookingDetails.roomNumber) {
      setBookingConfirmation('Please fill in all the fields.');
      setIsSubmitting(false);
      return;
    }

    // Kirim data pemesanan ke API
    const response = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingDetails),
    });

    if (response.ok) {
      setBookingConfirmation('Your booking has been confirmed! We look forward to welcoming you.');
      setIsModalOpen(true);
    } else {
      setBookingConfirmation('Sorry, there was an error with your booking. Please try again.');
    }
    setIsSubmitting(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const closeModal = () => {
    setIsModalOpen(false); // Menutup modal
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-full">
      <header className="bg-[#8cc6e4] text-center py-10 w-full">
        <h1 className="text-5xl font-semibold text-white">Welcome to AmritaJaya Guest House</h1>
        <p className="text-xl mt-4 text-white">Where Comfort Meets Affordability.</p>
      </header>

      {/* Our Services Section */}
      <section id="services" className="mt-12">
        <h2 className="text-4xl font-semibold mb-6 text-gray-900 dark:text-white">Our Services</h2>
        <select onChange={(e) => setFilterAvailability(e.target.value)} className="w-full p-3 mb-6 border rounded text-gray-900 dark:text-white dark:bg-gray-800">
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-lg border-2 ${room.availability === 'Available' ? 'border-green-500' : 'border-red-500'}`}>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{room.type}</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">{room.price}</p>
                <p className={`${room.availability === 'Available' ? 'text-green-500' : 'text-red-500'} mt-2`}>{room.availability}</p>
                <ul className="mt-4 text-gray-700 dark:text-gray-300">
                  {room.facilities.map((facility, i) => (
                    <li key={i} className="text-sm">{facility}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No services found</p>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section mt-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900 dark:text-white">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="gallery-item">
            <img src="/images/image1.jpg" alt="Gallery Image 1" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
          <div className="gallery-item">
            <img src="/images/image2.jpg" alt="Gallery Image 2" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
          <div className="gallery-item">
            <img src="/images/image3.jpg" alt="Gallery Image 3" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
          <div className="gallery-item">
            <img src="/images/image4.jpg" alt="Gallery Image 4" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking-section mt-12">
        <h2 className="text-3xl font-semibold text-center">Book Your Stay</h2>
        <form action="https://formsubmit.co/amritajayaguesthouse@gmail.com" method="POST"></form>
        <form onSubmit={handleBookingSubmit}>
          <div className="form-field space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={bookingDetails.name}
              onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
              required
              className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={bookingDetails.email}
              onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
              required
              className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
            />
          </div>
          <div className="form-field space-y-4">
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={bookingDetails.phone}
              onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
              required
              className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
            />
            <input
              type="date"
              name="checkin"
              value={bookingDetails.checkIn}
              onChange={(e) => setBookingDetails({ ...bookingDetails, checkIn: e.target.value })}
              required
              className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
            />
            <input
              type="date"
              name="checkout"
              value={bookingDetails.checkOut}
              onChange={(e) => setBookingDetails({ ...bookingDetails, checkOut: e.target.value })}
              required
              className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
            />
          </div>
          <div className="form-field space-y-4">
            <input
              type="number"
              name="numGuests"
              placeholder="Number of Guests"
              value={bookingDetails.numGuests}
              onChange={handleGuestsChange}
              min="1"
              max="10"
              required
              className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
            />
            <select
              name="room"
              value={bookingDetails.roomNumber}
              onChange={handleRoomChange}
              required
              className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
            >
              <option value="">Select a Room</option>
              {roomDetails.map((room, index) => (
                <option key={index} value={room.type}>{room.type}</option>
              ))}
            </select>
          </div>
          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-3 rounded bg-[#006f91] text-white ${isSubmitting ? 'opacity-50' : ''}`}
            >
              {isSubmitting ? 'Processing...' : 'Submit Booking'}
            </button>
          </div>
        </form>

        {bookingConfirmation && (
          <div className="mt-4 text-center text-lg">
            <p>{bookingConfirmation}</p>
          </div>
        )}
      </section>
      <section id="social" className="bg-blue-500 text-white py-8 px-4">
      <h2 className="text-3xl font-semibold text-center mb-6">About Us</h2>
      <div className="max-w-3xl mx-auto space-y-6">
        
        <div className="flex items-center justify-start space-x-4">
          <a
            href="https://www.instagram.com/amritajaya_guesthouse"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-yellow-300"
          >
            <i className="fab fa-instagram text-2xl"></i>
            <span className="text-lg">Instagram: amritajaya_guesthouse</span>
          </a>
        </div>

        <div className="flex items-center justify-start space-x-4">
          <a
            href="https://wa.me/62818101916"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-green-500"
          >
            <i className="fab fa-whatsapp text-2xl"></i>
            <span className="text-lg">WhatsApp: +62 818‑101‑916</span>
          </a>
        </div>

        <div className="flex items-center justify-start space-x-4">
          <a
            href="https://maps.app.goo.gl/Fws6Q7VNiHcDDbQC7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-blue-300"
          >
            <i className="fas fa-map-marker-alt text-2xl"></i>
            <span className="text-lg">
              Our Location: Jalan Muding Sari Perum Widuri Permai Blok B1 / No 1B
            </span>
          </a>
        </div>
      </div>
    </section>
{/* Footer Section */}
      <footer className="footer mt-12 text-center py-6">
        <p className="text-gray-600 dark:text-gray-300">© 2025 AmritaJaya Guest House. All rights reserved.</p>
      </footer>
    </div>
  );
}
