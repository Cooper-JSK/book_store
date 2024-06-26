import { useState, useEffect } from 'react'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://book-store-ncbo.onrender.com/books/${id}`);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error loading the book:', error);
        alert('There was an error loading the book. Please try again.');
      }
    };

    fetchBook();
  }, [id]);

  const handleEditBook = async () => {
    const data = { title, author, publishYear };
    setLoading(true);

    try {
      await axios.put(`http://localhost:5555/books/${id}`, data);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.error('Error saving the book:', error);
      alert('There was an error saving the book. Please try again.');
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
            <input
              type='number'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <button
            className='p-2 bg-sky-300 m-8 rounded-full'
            onClick={handleEditBook}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Edit and Save'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
