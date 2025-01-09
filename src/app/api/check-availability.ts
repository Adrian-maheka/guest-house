// app/api/check-availability/route.ts
import { NextResponse } from 'next/server';

// Simulasi database room availability
const roomAvailability = {
  'Room 1': 'unavailable',
  'Room 2': 'unavailable',
  'Room 3': 'unavailable',
  'Room 4': 'unavailable',
  'Room 5': 'unavailable',
  'Room 6': 'unavailable',
};

export async function GET() {
  try {
    // Di sini Anda bisa menambahkan logika untuk mengecek ketersediaan kamar
    // misalnya dari database atau sistem booking Anda
    
    // Contoh logika sederhana:
    // 1. Cek tanggal hari ini
    const today = new Date();
    
    // 2. Update availability berdasarkan waktu
    const updatedAvailability = Object.keys(roomAvailability).reduce((acc, room) => {
      // Simulasi: Kamar akan available jika jam saat ini adalah genap
      const isAvailable = today.getHours() % 2 === 0;  // Menggunakan jam genap sebagai ketersediaan
      acc[room] = isAvailable ? 'available' : 'unavailable'; // Status available atau unavailable
      return acc;
    }, {} as Record<string, 'available' | 'unavailable'>);

    // 3. Kirim response
    return NextResponse.json(updatedAvailability, { status: 200 });
  } catch (error) {
    console.error('Error checking room availability:', error);
    return NextResponse.json(
      { error: 'Failed to check room availability' },
      { status: 500 }
    );
  }
}
