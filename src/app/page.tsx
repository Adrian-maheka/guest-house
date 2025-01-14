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

  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, parseInt(e.target.value, 10));
    setBookingDetails({ ...bookingDetails, numChildren: value });
  };

  const handleRoomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setBookingDetails({ ...bookingDetails, numRooms: value });
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

    const formData = new FormData(event.target as HTMLFormElement);
    const message = `
New Booking Request:
Name: ${formData.get('name')}
Email: ${formData.get('email')}
Phone: ${formData.get('phone')}
Room Type: ${formData.get('roomType')}
Check-in: ${formData.get('checkIn')}
Check-out: ${formData.get('checkOut')}
Adults: ${formData.get('numGuests')}
Children: ${formData.get('numChildren')}
Rooms: ${formData.get('numRooms')}
    `;

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
      <section id="gallery" className="mt-12">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-gray-900 dark:text-white">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg col-span-full md:col-span-3 h-96">
            <video className="w-full h-full object-cover" controls>
              <source src="/videos/video1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg h-64">
            <img src="/images/image1.jpg" alt="Gallery Image 1" className="w-full h-full object-cover" />
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg h-64">
            <img src="/images/image2.jpg" alt="Gallery Image 2" className="w-full h-full object-cover" />
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg h-64">
            <img src="/images/image3.jpg" alt="Gallery Image 3" className="w-full h-full object-cover" />
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg h-64">
            <img src="/images/image4.jpg" alt="Gallery Image 4" className="w-full h-full object-cover" />
          </div>
         </div>
      </section>
      <section className="booking-section mt-8 max-w-4xl mx-auto px-4">
  <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-8">Book Your Stay</h2>
  <form onSubmit={handleBookingSubmit} className="space-y-6">
    {/* Personal Information */}
    <div className="space-y-4">
      <h3 className="text-lg md:text-xl font-medium mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={bookingDetails.name}
          onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
          required
          className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-[#8cc6e4] focus:border-transparent text-gray-900 dark:text-white dark:bg-gray-800"
          aria-label="Your Name"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={bookingDetails.email}
          onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
          required
          className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-[#8cc6e4] focus:border-transparent text-gray-900 dark:text-white dark:bg-gray-800"
          aria-label="Your Email"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={bookingDetails.phone}
          onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
          required
          className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-[#8cc6e4] focus:border-transparent text-gray-900 dark:text-white dark:bg-gray-800"
          aria-label="Your Phone"
        />
      </div>
    </div>

    {/* Booking Details */}
    <div className="space-y-4">
      <h3 className="text-lg md:text-xl font-medium mb-4">Booking Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Check-in Date</label>
            <input
              type="date"
              name="checkIn"
              value={bookingDetails.checkIn}
              onChange={(e) => setBookingDetails({ ...bookingDetails, checkIn: e.target.value })}
              required
              className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-[#8cc6e4] focus:border-transparent text-gray-900 dark:text-white dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Check-out Date</label>
            <input
              type="date"
              name="checkOut"
              value={bookingDetails.checkOut}
              onChange={(e) => setBookingDetails({ ...bookingDetails, checkOut: e.target.value })}
              required
              className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-[#8cc6e4] focus:border-transparent text-gray-900 dark:text-white dark:bg-gray-800"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="numGuests" className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Number of Adults</label>
            <input
              type="number"
              name="numGuests"
              value={bookingDetails.numGuests}
              onChange={handleGuestsChange}
              className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-[#8cc6e4] focus:border-transparent text-gray-900 dark:text-white dark:bg-gray-800"
              min={1}
              max={10}
              required
            />
          </div>
          <div>
            <label htmlFor="numChildren" className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Number of Children</label>
            <input
              type="number"
              name="numChildren"
              value={bookingDetails.numChildren}
              onChange={handleChildrenChange}
              className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-[#8cc6e4] focus:border-transparent text-gray-900 dark:text-white dark:bg-gray-800"
              min={0}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Room Selection */}
    <div className="space-y-4">
      <h3 className="text-lg md:text-xl font-medium mb-4">Room Selection</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Room Type</label>
          <select
            name="roomType"
            value={bookingDetails.roomType}
            onChange={(e) => setBookingDetails({ ...bookingDetails, roomType: e.target.value })}
            required
            className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-[#8cc6e4] focus:border-transparent text-gray-900 dark:text-white dark:bg-gray-800"
          >
            <option value="">Select Room Type</option>
            {roomDetails.map((room, index) => (
              <option key={index} value={room.type}>{room.type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Number of Rooms</label>
          <input
            type="number"
            name="numRooms"
            value={bookingDetails.numRooms}
            onChange={handleRoomsChange}
            className="w-full p-3 border rounded shadow-sm focus:ring-2 focus:ring-[#8cc6e4] focus:border-transparent text-gray-900 dark:text-white dark:bg-gray-800"
            min={1}
            required
          />
        </div>
      </div>
    </div>

    <div className="flex justify-center pt-6">
      <button
        type="submit"
        className="w-full md:w-auto px-8 py-4 bg-[#8cc6e4] text-white rounded-lg hover:bg-[#68a9d0] transition duration-300 font-medium shadow-md hover:shadow-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Book Now'}
      </button>
    </div>
  </form>

  {bookingConfirmation && (
    <div className="mt-6 text-center text-green-600 bg-green-50 p-4 rounded-lg">
      <p>{bookingConfirmation}</p>
    </div>
  )}
</section>
{/* Footer Section */}
      <footer className="bg-[#8cc6e4] text-white py-4 mt-8 text-center">
        <p>&copy; {new Date().getFullYear()} AmritaJaya Guest House. All Rights Reserved.</p>
        <div className="mt-4">
          <a href="https://www.instagram.com/amritajaya_guesthouse?igsh=MTZtNmVzcTZ2czhvZA%3D%3D" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://wa.me/62818101916" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
}
