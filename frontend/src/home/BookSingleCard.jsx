import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookModal from './BookModal';


const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);


  return (
    <div className='bg-white/70 backdrop-blur-md border-2 border-purple-200 rounded-2xl p-6 m-4 relative hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:border-purple-400'>
      <h2 className='absolute top-3 right-3 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg'>
        📅 {book.publishYear}
      </h2>
      <h4 className='my-3 text-xs text-purple-400 font-mono truncate'>{book._id}</h4>
      <div className='flex justify-start items-center gap-x-3 mb-3'>
        <PiBookOpenTextLight className='text-purple-500 text-3xl' />
        <h2 className='text-lg font-bold text-gray-900'>{book.title}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-3 mb-4'>
        <BiUserCircle className='text-pink-500 text-3xl' />
        <h2 className='text-base text-gray-700'>{book.author}</h2>
      </div>
      <div className='flex justify-around items-center gap-x-2 mt-6 pt-4 border-t border-purple-100'>
        <BiShow
          className='text-4xl text-blue-600 hover:text-blue-700 cursor-pointer transition-all hover:scale-125 drop-shadow-lg'
          onClick={() => setShowModal(true)}
          title='Quick View'
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className='text-3xl text-green-600 hover:text-green-700 transition-all hover:scale-125 drop-shadow-lg' title='Details' />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className='text-3xl text-amber-600 hover:text-amber-700 transition-all hover:scale-125 drop-shadow-lg' title='Edit' />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className='text-3xl text-rose-600 hover:text-rose-700 transition-all hover:scale-125 drop-shadow-lg' title='Delete' />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};


export default BookSingleCard;
