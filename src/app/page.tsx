"use client";

import { useState } from 'react';

export default function Home() {
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    numGuests: 1,
    numChildren: 0,
    roomType: '',
    numRooms: 1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    numGuests: '',
    roomType: '',
    numRooms: ''
  });

  const roomDetails = [
    { 
      type: 'Type 1 - Single Bed Room',
      price: 'Rp.400k/night', 
      availability: '5 Rooms Available', 
      facilities: ['Single Bed', 'AC', 'TV', 'Wi-Fi', 'Workspace', 'Parking', 'Swimming Pool', 'Small Kitchen', 'Hot Shower', 'Breakfast on Request', 'Balcony and Garden', 'Fridge'],
      maxRooms: 5
    },
    { 
      type: 'Type 2 - Double Bed Room',
      price: 'Rp.800k/night', 
      availability: '1 Room Available', 
      facilities: ['Double Bed', 'AC', 'TV', 'Wi-Fi', 'Workspace', 'Parking', 'Swimming Pool', 'Small Kitchen', 'Hot Shower', 'Breakfast on Request', 'Balcony and Garden', 'Fridge'],
      maxRooms: 1
    }
  ];

  const filteredRooms = roomDetails.filter(room => {
    if (filterAvailability === 'available') return room.availability.includes('Available');
    if (filterAvailability === 'unavailable') return room.availability.includes('Unavailable');
    return true;
  });

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(10, parseInt(e.target.value, 10)));
    setBookingDetails({ ...bookingDetails, numGuests: value });
  };

  const handleBookingSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let formErrors = { ...errors };

    if (!bookingDetails.name) formErrors.name = 'Name is required';
    if (!bookingDetails.email) formErrors.email = 'Email is required';
    if (!bookingDetails.phone) formErrors.phone = 'Phone number is required';
    if (!bookingDetails.checkIn) formErrors.checkIn = 'Check-in date is required';
    if (!bookingDetails.checkOut) formErrors.checkOut = 'Check-out date is required';
    if (!bookingDetails.numGuests) formErrors.numGuests = 'Number of guests is required';
    if (!bookingDetails.roomType) formErrors.roomType = 'Room type is required';
    if (!bookingDetails.numRooms) formErrors.numRooms = 'Number of rooms is required';

    setErrors(formErrors);

    if (Object.values(formErrors).some(error => error)) return;

    const message = `New Booking Request:
Name: ${bookingDetails.name}
Email: ${bookingDetails.email}
Phone: ${bookingDetails.phone}
Room Type: ${bookingDetails.roomType}
Check-in: ${bookingDetails.checkIn}
Check-out: ${bookingDetails.checkOut}
Adults: ${bookingDetails.numGuests}
Children: ${bookingDetails.numChildren}`;

    const whatsappUrl = `https://wa.me/62818101916?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setBookingConfirmation('Redirecting you to WhatsApp to complete your booking...');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      {/* Header Section */}
      <header className="bg-[#8cc6e4] text-center py-8 w-full rounded-lg">
        <h1 className="text-4xl sm:text-5xl font-semibold text-white">Welcome to AmritaJaya Guest House</h1>
        <p className="text-lg sm:text-xl mt-3 text-white">Where Comfort Meets Affordability.</p>
      </header>
      
      <section id="rooms" className="mt-12">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-gray-900 dark:text-white text-center">Our Rooms</h2>
        <select 
          onChange={(e) => setFilterAvailability(e.target.value)} 
          className="w-full p-3 mb-6 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
        >
          <option value="all">All Rooms</option>
          <option value="available">Available Rooms</option>
          <option value="unavailable">Unavailable Rooms</option>
        </select>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room, index) => (
            <div key={index} className="p-4 rounded-lg shadow-lg border border-gray-300 bg-white dark:bg-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{room.type}</h3>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">{room.price}</p>
              <p className="text-md text-blue-600 dark:text-blue-400 mb-3">{room.availability}</p>
              <div className="border-t border-gray-200 pt-3">
                <h4 className="text-md font-semibold mb-2 text-gray-900 dark:text-white">Room Facilities:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  {room.facilities.map((facility, i) => (
                    <li key={i} className="flex items-start">
                      {facility}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="gallery" className="mt-8">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900 dark:text-white">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg col-span-full md:col-span-3 h-96">
          <video className="w-full h-full object-cover" controls>
  <source src="/videos/video1.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

          </div>
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="bg-gray-200 rounded-lg overflow-hidden shadow-lg h-64">
              <img 
                src={`/images/image${num}.jpg`} 
                alt={`Gallery Image ${num}`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="booking-section mt-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-6">Book Your Stay</h2>
        <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={bookingDetails.name}
              onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
              required
              className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
              aria-label="Your Name"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={bookingDetails.email}
              onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
              required
              className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
              aria-label="Your Email"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={bookingDetails.phone}
              onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
              required
              className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
              aria-label="Your Phone Number"
            />
            <select
              value={bookingDetails.roomType}
              onChange={(e) => setBookingDetails({ ...bookingDetails, roomType: e.target.value })}
              required
              className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
              aria-label="Select Room Type"
            >
              <option value="">Select Room Type</option>
              <option value="single">Type 1 - Single Bed Room</option>
              <option value="double">Type 2 - Double Bed Room</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label htmlFor="checkIn" className="text-lg">Check-in Date</label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={bookingDetails.checkIn}
                onChange={(e) => setBookingDetails({ ...bookingDetails, checkIn: e.target.value })}
                required
                className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="checkOut" className="text-lg">Check-out Date</label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                value={bookingDetails.checkOut}
                onChange={(e) => setBookingDetails({ ...bookingDetails, checkOut: e.target.value })}
                required
                className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="numGuests" className="text-lg">Number of Guests</label>
              <input
                type="number"
                id="numGuests"
                name="numGuests"
                value={bookingDetails.numGuests}
                onChange={handleGuestsChange}
                min="1"
                max="10"
                required
                className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="numRooms" className="text-lg">Number of Rooms</label>
              <input
                type="number"
                id="numRooms"
                name="numRooms"
                value={bookingDetails.numRooms}
                onChange={(e) => setBookingDetails({ ...bookingDetails, numRooms: parseInt(e.target.value, 10) })}
                min="1"
                max="5"
                required
                className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
            aria-label="Submit booking request"
          >
            {isSubmitting ? 'Booking...' : 'Book Now'}
          </button>
        </form>
        {bookingConfirmation && (
          <p className="text-lg mt-4 text-center text-green-600 dark:text-green-400" role="alert">
            {bookingConfirmation}
          </p>
        )}
      </section>

      {/* Modal Section */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-lg p-8 max-w-sm mx-auto text-center">
            <p id="modal-title" className="text-lg font-semibold text-blue-600">Booking Confirmation</p>
            <p>{bookingConfirmation}</p>
            <button 
              onClick={closeModal} 
              className="mt-4 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
              aria-label="Close modal"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#8cc6e4] text-center py-6 mt-8 rounded-lg">
        <p className="text-sm text-white">&copy; 2025 AmritaJaya Guest House. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xl text-white hover:text-yellow-500 transition-colors duration-300"
            aria-label="Visit our Instagram"
          >
            Instagram
          </a>
          <span className="text-white">|</span>
          <a 
            href="https://wa.me/62818101916" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xl text-white hover:text-yellow-500 transition-colors duration-300"
            aria-label="Contact us on WhatsApp"
          >
            WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
}