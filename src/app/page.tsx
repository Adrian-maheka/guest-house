"use client";

import { useState } from 'react';

interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  numAdultGuests: number;
  numChildren: number;
  roomType: string;
  numRooms: number;
}

interface RoomDetail {
  type: string;
  price: string;
  availability: string;
  facilities: string[];
  maxRooms: number;
}

export default function Page() {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    numAdultGuests: 1,
    numChildren: 0,
    roomType: '',
    numRooms: 1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<BookingDetails>>({});

  const roomDetails: RoomDetail[] = [
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

  const handleAdultGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(10, parseInt(e.target.value) || 1));
    setBookingDetails({ ...bookingDetails, numAdultGuests: value });
  };

  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(5, parseInt(e.target.value) || 0));
    setBookingDetails({ ...bookingDetails, numChildren: value });
  };

const validateForm = (): boolean => {
      const newErrors: Partial<BookingDetails> = {}; // Corrected
      if (!bookingDetails.name) newErrors.name = 'Name is required';
      if (!bookingDetails.email) newErrors.email = 'Email is required';
      if (!bookingDetails.phone) newErrors.phone = 'Phone number is required';
      if (!bookingDetails.checkIn) newErrors.checkIn = 'Check-in date is required';
      if (!bookingDetails.checkOut) newErrors.checkOut = 'Check-out date is required';
      if (!bookingDetails.roomType) newErrors.roomType = 'Room type is required';
    
      const numRooms = Number(bookingDetails.numRooms);
const numAdultGuests = Number(bookingDetails.numAdultGuests);

if (isNaN(numRooms) || numRooms < 1) {
  newErrors.numRooms = 'At least 1 room is required';
}

if (isNaN(numAdultGuests) || numAdultGuests < 1) {
  newErrors.numAdultGuests = 'At least 1 adult guest is required';
}
      
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    

  const formatWhatsAppMessage = (): string => {
    return `*New Booking Request*%0A
*Guest Details:*%0A
Name: ${bookingDetails.name}%0A
Email: ${bookingDetails.email}%0A
Phone: ${bookingDetails.phone}%0A%0A
*Booking Details:*%0A
Room Type: ${bookingDetails.roomType}%0A
Number of Rooms: ${bookingDetails.numRooms}%0A
Check-in: ${bookingDetails.checkIn}%0A
Check-out: ${bookingDetails.checkOut}%0A
Adult Guests: ${bookingDetails.numAdultGuests}%0A
Children: ${bookingDetails.numChildren}`;
  };

  const handleBookingSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const whatsappMessage = formatWhatsAppMessage();
      const whatsappNumber = '62818101916'; // Replace with your actual WhatsApp number
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      
      setBookingConfirmation('Booking request received! Redirecting to WhatsApp...');
      setIsModalOpen(true);
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      setBookingConfirmation('There was an error processing your booking. Please try again.');
      setIsModalOpen(true);
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBookingConfirmation('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      {/* Header Section */}
      <header className="bg-[#8cc6e4] text-center py-8 w-full rounded-lg">
        <h1 className="text-4xl sm:text-5xl font-semibold text-white">Welcome to AmritaJaya Guest House</h1>
        <p className="text-lg sm:text-xl mt-3 text-white">Where Comfort Meets Affordability</p>
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
          src={`/images/image${num}.jpg`}  // Corrected: wrapped in curly braces and template literals
          alt={`Gallery Image ${num}`}     // Corrected: wrapped in curly braces and template literals
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <label htmlFor="numAdultGuests" className="text-lg">Number of Adult Guests</label>
              <input
                type="number"
                id="numAdultGuests"
                name="numAdultGuests"
                min="1"
                max="10"
                value={bookingDetails.numAdultGuests}
                onChange={handleAdultGuestsChange}
                className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
                aria-label="Number of Adult Guests"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="numChildren" className="text-lg">Number of Children</label>
              <input
                type="number"
                id="numChildren"
                name="numChildren"
                min="0"
                max="5"
                value={bookingDetails.numChildren}
                onChange={handleChildrenChange}
                className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
                aria-label="Number of Children"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="roomType" className="text-lg">Room Type</label>
            <select
              id="roomType"
              name="roomType"
              value={bookingDetails.roomType}
              onChange={(e) => setBookingDetails({ ...bookingDetails, roomType: e.target.value })}
              required
              className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
            >
              <option value="">Select Room Type</option>
              <option value="Type 1 - Single Bed Room">Type 1 - Single Bed Room</option>
              <option value="Type 2 - Double Bed Room">Type 2 - Double Bed Room</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="numRooms" className="text-lg">Number of Rooms</label>
            <input
              type="number"
              id="numRooms"
              name="numRooms"
              min="1"
              max="5"
              value={bookingDetails.numRooms}
              onChange={(e) => setBookingDetails({ ...bookingDetails, numRooms: Math.max(1, Math.min(5, parseInt(e.target.value) || 1)) })}
              required
              className="w-full p-3 border rounded text-gray-900 dark:text-white dark:bg-gray-800"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking'}
            </button>
          </div>
        </form>
      </section>

      {/* Modal for confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-lg w-full">
            <p className="text-xl font-semibold text-center text-gray-900 dark:text-white">{bookingConfirmation}</p>
            <button
              onClick={closeModal}
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
