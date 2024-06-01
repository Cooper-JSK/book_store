import { useState } from 'react';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = async () => {
    try {
      setLoading(true);
      console.log(`Deleting book with ID: ${id}`);  // Log the ID to verify it's correct
      await axios.delete(`http://localhost:5555/books/${id}`);
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.error('Error deleting book:', error);  // Improved error logging
      setLoading(false);
      alert('An error occurred while deleting the book');
    }
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure that you want to delete this book?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete It!'}
        </button>
      </div>
    </div>
  );
}

export default DeleteBook;
