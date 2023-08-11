'use server';

import { Room } from '@prisma/client/main';
import { cookies } from 'next/headers';

const options = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${cookies().get('token')?.value}`,
  },
});

export async function fetchRoom(roomId: string): Promise<Room> {
  console.log('fetchRoom');
  return fetch(`http://localhost:3000/api/rooms/${roomId}`, {
    ...options(),
  })
    .then((res) => res.json())
    .then((room) => {
      if (room) {
        return room;
      }
    });
}

export async function fetchRooms(): Promise<Room[]> {
  console.log('fetchRooms');
  return fetch(`http://localhost:3000/api/rooms`, {
    ...options(),
  })
    .then((res) => res.json())
    .then((rooms) => {
      if (rooms) {
        return rooms;
      }
    });
}

export async function createRoom(data: { name: string }) {
  console.log('createRoom');
  return fetch(`http://localhost:3000/api/rooms`, {
    ...options(),
    method: 'POST',
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}
